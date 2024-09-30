import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbTypeahead, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Observable, debounceTime, distinctUntilChanged, merge, map, tap, switchMap, catchError, of } from 'rxjs';
import { ApiService } from '../../services/api/api.service';
import { HelpersService } from '../../services/helpers/helpers.service';
import { CommonModule, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FileUploadsComponent } from '../../components/file-uploads/file-uploads.component';

@Component({
  selector: 'app-cd-speciality-board',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TranslateModule,
    CommonModule,
    NgbTypeaheadModule,
    RouterLink,
    FileUploadsComponent,
    FormsModule,
    NgFor
  ],
  templateUrl: './cd-speciality-board.component.html',
  styleUrl: './cd-speciality-board.component.scss'
})
export class CdSpecialityBoardComponent {
  @ViewChild('instance', { static: true }) instance!: NgbTypeahead;
  isBoardCertified: string = "yes";
  searching = false;
  searchFailed = false;
  specialityParentFormGroup!: FormGroup;
  filteredCities: any;

  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  countryMaster: any;

  constructor(
    private fb: FormBuilder,
    private helper: HelpersService,
    private api: ApiService
  ) {
    this.specialityParentFormGroup = this.fb.group({
      specialityFormGroup: this.fb.array([this.createSpecialityFormGroup()]),
    })
  }

  /**
  * @description Used to format date
  * @param date 
  * @param formControl 
  */
  formatDate(date: any, formControl: string, i: number) {
    let formatedDate = this.helper.formatDate(date.target.value);
    const specialityFormControls = this.specialityParentFormGroup.get('specialityFormGroup') as FormArray;
    specialityFormControls.at(i).patchValue({ [formControl]: formatedDate });
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
      // const specialityFormControls = this.specialityParentFormGroup.get('specialityFormGroup') as FormArray;
      // specialityFormControls.at(i).patchValue({ [formControl]: formatedDate });
      const specialityFormControls = this.specialityParentFormGroup.get('specialityFormGroup') as FormArray;
      specialityFormControls.at(i).get('country')?.setValue(place[place.length - 1]);
      setTimeout(() => this.specialityParentFormGroup.get('stateCity')?.setValue(`${place[0]},${place[1]}`));
    }
  }

  private createSpecialityFormGroup(): FormGroup {
    return new FormGroup({
      "specialtyBoardName": new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z ]+$")]),
      "country": new FormControl('', [Validators.required]),
      "stateCity": new FormControl('', [Validators.required]),
      "email": new FormControl('', [Validators.required]),
      "dateCertificationObtained": new FormControl('', [Validators.required]),
      "boardIdentificationNumber": new FormControl('', [Validators.required]),
      "website": new FormControl('', [Validators.required]),
    })
  }

  get formControllers() {
    return this.specialityParentFormGroup.controls;
  }

  /**
  * @author Imran A
  * @description used to get the formcontrol for validations
  * @param controlName 
  * @returns 
  */
  getControl(index: number, controlName: string): FormControl {
    const specialityFormArray = this.specialityParentFormGroup.get('specialityFormGroup') as FormArray;
    return specialityFormArray.at(index).get(controlName) as FormControl;
  }

  get specialityFormGrp(): FormArray {
    return this.specialityParentFormGroup.get('specialityFormGroup') as FormArray;
  }

  /**
  * when Plus icon is clicked this func adds new open and close time fields 
  */
  public addspecialityFormGroup(val: any) {
    const specialityForm = this.specialityParentFormGroup.get(val) as FormArray
    specialityForm.push(this.createSpecialityFormGroup())
  }

  /**
   * when minus icon is clicked this func adds new open and close time fields 
   */
  public removeSpecialityFormGroup(i: number, val: any) {
    const specialityForm = this.specialityParentFormGroup.get(val) as FormArray
    if (specialityForm.length > 1) {
      specialityForm.removeAt(specialityForm.length - 1)
    } else {
      specialityForm.reset()
      return
    }
  }


  handleFormEnable(e: any) {
    console.log(e.target.value);
    this.isBoardCertified = e.target.value;
  }

  /**
  * @description Used to submit the form
  */
  onSubmit() {
    console.log(this.specialityParentFormGroup.value);
  }
}
