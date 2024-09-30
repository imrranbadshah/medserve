import { Component, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
// import { DynamicFormsComponent } from '../../components/dynamic-forms/dynamic-forms.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HelpersService } from '../../services/helpers/helpers.service';
import { catchError, debounceTime, distinctUntilChanged, filter, map, merge, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { NgbTypeahead, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { IDropdownSettings, NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FileUploadsComponent } from '../../components/file-uploads/file-uploads.component';
import { isPlatformBrowser, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-cd-personal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgbTypeaheadModule,
    TranslateModule,
    NgMultiSelectDropDownModule,
    FileUploadsComponent,
    JsonPipe
  ],
  templateUrl: './cd-personal.component.html',
  styleUrl: './cd-personal.component.scss'
})
export class CdPersonalComponent implements OnInit {
  @ViewChild('instance', { static: true }) instance!: NgbTypeahead;
  searching = false;
  searchingCountry = false;
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
    @Inject(PLATFORM_ID) private platformId: Object,
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

  async ngOnInit(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      let resp: any = await this.getCountryMaster();
      this.countryMaster = resp.data.countryList;
      this.spokenLanguages = resp.data.languageList;
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
  async getCountryMaster() {
    // if (isPlatformBrowser(this.platformId)) {
    return await this.api.getCountryMaster()
    // }
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

  // formatter = (result: any) => {
  //   debugger
  //   return result?.toUpperCase()
  // };
  /**
   * @description used to search for cities
   */
  searchCities = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => (this.searching = true)),
      switchMap(term => this.getCities(term, 'city')),
      tap(() => (this.searching = false)),
      map((resp: any) => {
        return resp.map((city: any) => city);
        // return resp.map((city: any) => city.title);
      })
    );

  searchCountryformatter = (x: { title: string, countryName: string }) => {
    console.log("searchCoutryCityformatter - country", x);
    if (!x.countryName) {
      return x.title;
    } else {
      return x.countryName;
    }
  };

  searchCityformatter = (x: { title: string, countryName: string }) => {
    console.log("searchCoutryCityformatter - city", x);
    return x.title;
  };

  /**
   * @description used to search for cities
   */
  searchCountries = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => (this.searchingCountry = true)),
      switchMap(term => this.getCities(term, 'country')),
      tap(() => (this.searchingCountry = false)),
      map((resp: any) => {
        return resp.map((country: any) => country);
      })
    );


  /**
   * @description API call to get cities based on user input and filter list based on type 1
   */
  getCities(searchTerm: string, type: string): Observable<any[]> {
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
    let typeId;
    if (type == "city") {
      typeId = 1;
    } else {
      typeId = 3;
    }

    return this.api.getCities(temp).pipe(
      tap(() => (this.searchFailed = false)),
      catchError(() => {
        this.searchFailed = true;
        return of([]);
      }),
      map((resp: any) => {
        let title = resp.data.list?.filter((city: any) => city.type === typeId);
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
  onCitySelect(item: any, formcontrol: string) {
    console.log("onCitySelect", item);
    const selectedObj = item.item;
    if (selectedObj && formcontrol != "nationality") {
      // if () {
      let place = selectedObj.title.split(",");
      this.personalFormGroup.get('residenceCountry')?.setValue(selectedObj.countryName);
      setTimeout(() => this.personalFormGroup.get('stateCity')?.setValue(`${place[0]},${place[1]}`));
      // }
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
