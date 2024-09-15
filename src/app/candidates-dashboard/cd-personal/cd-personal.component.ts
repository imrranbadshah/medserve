import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { DynamicFormsComponent } from '../../components/dynamic-forms/dynamic-forms.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HelpersService } from '../../services/helpers/helpers.service';
import { catchError, debounceTime, distinctUntilChanged, filter, map, merge, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { NgbTypeahead, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-cd-personal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgbTypeaheadModule,
    TranslateModule
  ],
  templateUrl: './cd-personal.component.html',
  styleUrl: './cd-personal.component.scss'
})
export class CdPersonalComponent implements OnInit {
  @ViewChild('instance', { static: true }) instance!: NgbTypeahead;
  searching = false;
  searchFailed = false;
  personalFormGroup!: FormGroup;
  genderList: any[] = [
    {
      id: 1,
      value: "Male"
    },
    {
      id: 1,
      value: "Female"
    },
    {
      id: 1,
      value: "Trans"
    },
    {
      id: 1,
      value: "Do not Disclose"
    },
  ];

  filteredCities: any;

  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  countryMaster: any;
  constructor(private fb: FormBuilder, private helper: HelpersService, private api: ApiService) {
    this.personalFormGroup = this.fb.group(
      {
        firstName: ['', [Validators.required, Validators.pattern("^[a-zA-Z ]+$")]],
        lastName: ['', [Validators.required, Validators.pattern("^[a-zA-Z ]+$")]],
        gender: ['', [Validators.required]],
        dateOfBirth: ['', [Validators.required]],
        spouseName: ['', [Validators.required, Validators.pattern("^[a-zA-Z ]+$")]],
        countryCode: ['', [Validators.required]],
        phoneNumber: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,3}$')]],
        address: ['', [Validators.required]],
        country: ['', [Validators.required, Validators.pattern("^[a-zA-Z ]+$")]],
        stateCity: ['', [Validators.required]],
        passportNumber: ['', [Validators.required]],
        countryOfIssue: ['', [Validators.required, Validators.pattern("^[a-zA-Z ]+$")]],
        issueDate: ['', [Validators.required]],
        expiryDate: ['', [Validators.required]],
      }
    )
  }

  ngOnInit(): void {
    this.getCountryMaster();
  }

  /**
   * @author Imran A
   * @description used to get the formcontrol for validations
   * @param controlName 
   * @returns 
   */
  getControl(controlName: string) {
    return this.personalFormGroup.get(controlName) as FormControl;
  }

  /**
   * @description used to call api for country list
   */
  getCountryMaster() {
    this.api.getCountryMaster().subscribe((resp: any) => {
      this.countryMaster = resp.data.countryList;
    })
  }

  /**
   * @description used to searching the cities on inputs
   * @param text$ 
   * @returns 
   */
  search = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$).pipe(
      map(term => this.filterCountries(term)),
      map((resp: any) => {
        return resp.map((country: any) => country.dial_code);
      })
    );
  }

  /**
   * @description Used to filter country list based on inputs
   */
  filterCountries(term: string): any[] {
    if (!term) {
      return this.countryMaster.slice(0, 10); // Return initial 10 for empty term
    }

    const filteredCountries = this.countryMaster.filter((country: any) =>
      country.countryName.toLowerCase().indexOf(term.toLowerCase()) > -1
    );

    return filteredCountries.slice(0, 10); // Return first 10 filtered countries
  }

  /**
   * @description used to search for cities
   */
  searchCities = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => (this.searching = true)),
      switchMap(term => this.getCities(term)),
      tap(() => (this.searching = false)),
      map((resp: any) => {
        return resp.map((city: any) => city.title);
      })
    );


  /**
   * @description API call to get cities based on user input and filter list based on type 1
   */
  getCities(searchTerm: string): Observable<any[]> {
    console.log("searchTerm", searchTerm);
    if (searchTerm.length < 2) {
      return new Observable(observer => observer.next([])); // Return empty array if the input is too short
    }
    const temp = {
      startPage: 1,
      limit: 1000,
      search: searchTerm,
      lastTimeStamp: null
    };

    return this.api.getCities(temp).pipe(
      tap(() => (this.searchFailed = false)),
      catchError(() => {
        this.searchFailed = true;
        return of([]);
      }),
      map((resp: any) => {
        let title = resp.data.list?.filter((city: any) => city.type === 1);
        return title;
      })
    );
  }

  /**
  * @description Used to format date
  * @param date 
  * @param formControl 
  */
  formatDate(date: any, formControl: string) {
    let formatedDate = this.helper.formatDate(date.target.value);
    this.personalFormGroup.patchValue({ [formControl]: formatedDate });
  }

  /**
   * @description used to city selections
   */
  onCitySelect(title: any) {
    console.log("onCitySelect", title);
    const selectedCity = title.item;
    if (selectedCity) {
      let place = selectedCity.split(",");
      this.personalFormGroup.get('country')?.setValue(place[place.length - 1]);
      setTimeout(() => this.personalFormGroup.get('stateCity')?.setValue(`${place[0]},${place[1]}`));
    }
  }

  /**
  * @description Used to submit the form
  */
  onSubmit() {
    console.log(this.personalFormGroup.value);
  }
}
