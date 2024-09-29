import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
// import { DynamicFormsComponent } from '../../components/dynamic-forms/dynamic-forms.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HelpersService } from '../../services/helpers/helpers.service';
import { catchError, debounceTime, distinctUntilChanged, filter, map, merge, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { NgbTypeahead, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { IDropdownSettings, NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FileUploadsComponent } from '../../components/file-uploads/file-uploads.component';

@Component({
  selector: 'app-cd-personal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgbTypeaheadModule,
    TranslateModule,
    NgMultiSelectDropDownModule,
    FileUploadsComponent
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
  dropdownSettings!: IDropdownSettings;
  spokenLanguages = [];
  constructor(
    private fb: FormBuilder,
    private helper: HelpersService,
    private api: ApiService,
    public translate: TranslateService,
  ) {
    this.personalFormGroup = this.fb.group(
      {
        permanentEmailNotify: ['', [Validators.required, Validators.pattern("^[a-zA-Z ]+$")]],
        permanentMobileNotify: ['', [Validators.required, Validators.pattern("^[0-9 ]+$")]],
        gender: ['', [Validators.required]],
        dateOfBirth: ['', [Validators.required]],
        stateCity: ['', [Validators.required]],
        nationality: ['', [Validators.required, Validators.pattern("^[a-zA-Z ]+$")]],
        residenceCountry: ['', [Validators.required, Validators.pattern("^[a-zA-Z ]+$")]],
        passportNumber: ['', [Validators.required]],
        passportExpiryDate: ['', [Validators.required]],
        degreeLanguage: ['', [Validators.required]],
        wasEnglishLangDegree: ['', [Validators.required]],
        spokenLanguages: ['', [Validators.required]],
        englishProficiencyTest: ['', [Validators.required]],
      }
    )
  }

  ngOnInit(): void {
    this.getCountryMaster();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'lngId',
      textField: 'languageName',
      enableCheckAll: false,
      defaultOpen: false,
      allowSearchFilter: true,
      searchPlaceholderText: this.getTranslatedString("personalForm.searchspokenLang")
    }
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
      console.log("getCountryMaster resp", resp)
      this.countryMaster = resp.data.countryList;
      this.spokenLanguages = resp.data.languageList;
    })
  }

  /**
   * @description used to searching the cities on inputs
   * @param text$ 
   * @returns 
   */
  searchPhCode = (text$: Observable<string>) => {
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
      this.personalFormGroup.get('residenceCountry')?.setValue(place[place.length - 1]);
      setTimeout(() => this.personalFormGroup.get('stateCity')?.setValue(`${place[0]},${place[1]}`));
    }
  }

  getTranslatedString(Key: any) {
    console.log("Translate KEY:" + Key);
    let translatedValue = "";
    this.translate.get(Key).subscribe((translatedString: any) => {
      translatedValue = translatedString;
    },
      (error) => {
        console.log(error);
        translatedValue = error;
      }
    );
    console.log(translatedValue);
    return translatedValue;
  }

  /**
  * @description Used to submit the form
  */
  onSubmit() {
    console.log(this.personalFormGroup.value);
  }
}
