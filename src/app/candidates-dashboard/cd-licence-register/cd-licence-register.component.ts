import { Component, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormControl, FormArray } from '@angular/forms';
import { HelpersService } from '../../services/helpers/helpers.service';
import { TranslateModule } from '@ngx-translate/core';
import { NgbTypeahead, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Observable, debounceTime, distinctUntilChanged, merge, map, tap, switchMap, catchError, of } from 'rxjs';
import { CommonModule, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FileUploadsComponent } from '../../components/file-uploads/file-uploads.component';
@Component({
  selector: 'app-cd-licence-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TranslateModule,
    CommonModule,
    NgbTypeaheadModule,
    RouterLink,
    FileUploadsComponent,
    NgFor
  ],
  templateUrl: './cd-licence-register.component.html',
  styleUrl: './cd-licence-register.component.scss'
})
export class CdLicenceRegisterComponent {
  @ViewChild('instance', { static: true }) instance!: NgbTypeahead;
  searching = false;
  searchFailed = false;
  experienceParentFormGroup!: FormGroup;
  filteredCities: any;

  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  countryMaster: any;

  constructor(
    private fb: FormBuilder,
    private helper: HelpersService,
    private api: ApiService
  ) {
    this.experienceParentFormGroup = this.fb.group({
      expFormGroup: this.fb.array([this.createExpFormGroup()]),
    })
  }

  /**
  * @description Used to format date
  * @param date 
  * @param formControl 
  */
  formatDate(date: any, formControl: string, i: number) {
    let formatedDate = this.helper.formatDate(date.target.value);
    const expFormControls = this.experienceParentFormGroup.get('expFormGroup') as FormArray;
    expFormControls.at(i).patchValue({ [formControl]: formatedDate });
  }

  /**
  * @description used to call api for country list
  */
  getCountryMaster() {
    this.api.getCountryMaster().then((resp: any) => {
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
  onCitySelect(title: any, i: number) {
    console.log("onCitySelect", title);
    const selectedCity = title.item;
    if (selectedCity) {
      let place = selectedCity.split(",");
      const ExpFormControls = this.experienceParentFormGroup.get('expFormGroup') as FormArray;
      ExpFormControls.at(i).get('country')?.setValue(place[place.length - 1]);
      setTimeout(() => ExpFormControls.at(i).get('country')?.setValue(`${place[0]},${place[1]}`));
    }
  }

  private createExpFormGroup(): FormGroup {
    return new FormGroup({
      "fullNameLRJurisdiction": new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z ]+$")]),
      "country": new FormControl('', [Validators.required]),
      "email": new FormControl('', [Validators.required]),
      "licenseNumber": new FormControl('', [Validators.required]),
      "licenseInssuanceDate": new FormControl('', [Validators.required]),
      "licenseExpDate": new FormControl('', [Validators.required]),
      "status": new FormControl('', [Validators.required]),
      "licenseTitle": new FormControl('', [Validators.required]),
      "speciality": new FormControl('', [Validators.required]),
    })
  }

  get formControllers() {
    return this.experienceParentFormGroup.controls;
  }

  /**
  * @author Imran A
  * @description used to get the formcontrol for validations
  * @param controlName 
  * @returns 
  */
  getControl(index: number, controlName: string): FormControl {
    const expFormArray = this.experienceParentFormGroup.get('expFormGroup') as FormArray;
    return expFormArray.at(index).get(controlName) as FormControl;
  }

  get expFormGrp(): FormArray {
    return this.experienceParentFormGroup.get('expFormGroup') as FormArray;
  }

  /**
  * when Plus icon is clicked this func adds new open and close time fields 
  */
  public addExpFormGroup(val: any) {
    const expForm = this.experienceParentFormGroup.get(val) as FormArray
    expForm.push(this.createExpFormGroup())
  }

  /**
   * when minus icon is clicked this func adds new open and close time fields 
   */
  public removeExpFormGroup(i: number, val: any) {
    const expForm = this.experienceParentFormGroup.get(val) as FormArray
    if (expForm.length > 1) {
      expForm.removeAt(expForm.length - 1)
    } else {
      expForm.reset()
      return
    }
  }

  /**
   * @description Used to submit the form
   */
  onSubmit() {
    console.log(this.experienceParentFormGroup.value);
  }
}