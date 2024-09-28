import { NgFor } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgbTypeahead, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { FileUploadsComponent } from '../../components/file-uploads/file-uploads.component';
import { ApiService } from '../../services/api/api.service';
import { HelpersService } from '../../services/helpers/helpers.service';
import { Observable, debounceTime, distinctUntilChanged, merge, map, tap, switchMap, catchError, of, Subject } from 'rxjs';

@Component({
  selector: 'app-cd-ug-education',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TranslateModule,
    NgbTypeaheadModule,
    RouterLink,
    FileUploadsComponent,
    NgFor
  ],
  templateUrl: './cd-ug-education.component.html',
  styleUrl: './cd-ug-education.component.scss'
})
export class CdUgEducationComponent {
  @ViewChild('instance', { static: true }) instance!: NgbTypeahead;
  searching = false;
  searchFailed = false;
  academicsUGParentFormGroup!: FormGroup;
  filteredCities: any;

  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  countryMaster: any;

  constructor(
    private fb: FormBuilder,
    private helper: HelpersService,
    private api: ApiService
  ) {
    this.academicsUGParentFormGroup = this.fb.group({
      ugFormGroup: this.fb.array([this.createUGFormGroup()]),
    })
  }

  /**
  * @description Used to format date
  * @param date 
  * @param formControl 
  */
  formatDate(date: any, formControl: string, type: string) {
    let formatedDate = this.helper.formatDate(date.target.value);
    this.academicsUGParentFormGroup.patchValue({ [formControl]: formatedDate });
  }

  /**
  * @description used to call api for country list
  */
  getCountryMaster() {
    this.api.getCountryMaster().subscribe((resp: any) => {
      console.log("getCountryMaster resp", resp)
      this.countryMaster = resp.data.countryList;
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
   * @description used to city selections
   */
  onCitySelect(title: any) {
    console.log("onCitySelect", title);
    const selectedCity = title.item;
    if (selectedCity) {
      let place = selectedCity.split(",");
      this.academicsUGParentFormGroup.get('country')?.setValue(place[place.length - 1]);
      setTimeout(() => this.academicsUGParentFormGroup.get('stateCity')?.setValue(`${place[0]},${place[1]}`));
    }
  }

  private createUGFormGroup(): FormGroup {
    return new FormGroup({
      "fullInstituteName": new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z ]+$")]),
      "stateCity": new FormControl('', [Validators.required]),
      "country": new FormControl('', [Validators.required]),
      "email": new FormControl('', [Validators.required]),
      "attendedfromDate": new FormControl('', [Validators.required]),
      "attendedtoDate": new FormControl('', [Validators.required]),
      "graduationDate": new FormControl('', [Validators.required]),
      "degree": new FormControl('', [Validators.required]),
      "website": new FormControl('', [Validators.required]),
    })
  }

  get formControllers() {
    return this.academicsUGParentFormGroup.controls;
  }

  /**
  * @author Imran A
  * @description used to get the formcontrol for validations
  * @param controlName 
  * @returns 
  */
  getUGControl(index: number, controlName: string): FormControl {
    const ugFormArray = this.academicsUGParentFormGroup.get('ugFormGroup') as FormArray;
    return ugFormArray.at(index).get(controlName) as FormControl;
  }

  get academicUGFormGrp(): FormArray {
    return this.academicsUGParentFormGroup.get('ugFormGroup') as FormArray;
  }

  /**
  * when Plus icon is clicked this func adds new open and close time fields 
  */
  public addUGFormGroup(val: any) {
    const ugForm = this.academicsUGParentFormGroup.get(val) as FormArray
    ugForm.push(this.createUGFormGroup())
  }

  /**
   * when minus icon is clicked this func adds new open and close time fields 
   */
  public removeUGFormGroup(i: number, val: any) {
    const ugForm = this.academicsUGParentFormGroup.get(val) as FormArray
    if (ugForm.length > 1) {
      ugForm.removeAt(ugForm.length - 1)
    } else {
      ugForm.reset()
      return
    }
  }

  /**
  * @description Used to submit the form
  */
  onSubmit() {
    console.log(this.academicsUGParentFormGroup.value);
  }
}
