import { Component, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormControl, FormArray, FormArrayName } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { HelpersService } from '../../services/helpers/helpers.service';
import { FileUploadsComponent } from '../../components/file-uploads/file-uploads.component';
import { NgbTypeahead, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, map, merge, Observable, Subject } from 'rxjs';
import { ApiService } from '../../services/api/api.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-ed-company-profile',
  standalone: true,
  imports: [RouterLink, NgbTypeaheadModule, ReactiveFormsModule, TranslateModule, FileUploadsComponent, NgFor],
  templateUrl: './ed-company-profile.component.html',
  styleUrl: './ed-company-profile.component.scss'
})
export class EdCompanyProfileComponent implements OnInit {
  @ViewChild('instance', { static: true }) instance!: NgbTypeahead;
  searching = false;
  searchFailed = false;
  // companyFormGroup!: FormGroup;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  countryMaster: any;
  companyParentFormGroup!: FormGroup;
  constructor(private fb: FormBuilder, private api: ApiService, private helper: HelpersService) {
    // this.companyFormGroup = this.fb.group({
    //   companyName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    //   address: ['', [Validators.required, Validators.minLength(10)]],
    //   yearFounded: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
    //   companyWebsite: ['', [Validators.required, Validators.pattern(/^(http|https):\/\/[a-z0-9]+([\.-][a-z0-9]+)*\.[a-z]{2,4}(\/[\w\-]+)*\/?$/)]],
    //   emailAddress: ['', [Validators.required, Validators.email]],
    //   countryCode: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    //   phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    //   aboutCompany: ['', [Validators.required, Validators.minLength(50)]],
    //   organizationCode: ['', [Validators.required, Validators.minLength(3)]],
    //   companySize: ['', Validators.required],
    //   industryType: ['', Validators.required],
    // });

    this.companyParentFormGroup = this.fb.group({
      companyFormGroup: this.fb.array([this.createProductFormGroup()]),
    });
  }

  ngOnInit(): void {
    // this.getCountryMaster();
  }

  get formControllers() {
    return this.companyParentFormGroup.controls;
  }

  /**
  * when Plus icon is clicked this func adds new open and close time fields 
  */
  public addCompanyFormGroup(val: any) {
    const product = this.companyParentFormGroup.get(val) as FormArray
    product.push(this.createProductFormGroup())
  }

  /**
   * when minus icon is clicked this func adds new open and close time fields 
   */
  public removeCompanyFormGroup(i: number, val: any) {
    const company = this.companyParentFormGroup.get(val) as FormArray
    if (company.length > 1) {
      company.removeAt(company.length - 1)
    } else {
      company.reset()
      return
    }
  }



  get companyFormGrp(): FormArray {
    return this.companyParentFormGroup.get('companyFormGroup') as FormArray;
  }

  /**
  * @author Imran A
  * @description used to get the formcontrol for validations
  * @param controlName 
  * @returns 
  */
  getControl(index: number, controlName: string): FormControl {
    const companyArray = this.companyParentFormGroup.get('companyFormGroup') as FormArray;
    return companyArray.at(index).get(controlName) as FormControl;
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
   * @description Used to submit the form
   */
  onSubmit() {
    // console.log(this.companyFormGroup.value);
  }


  /**
     * formarray func to call when creating or deleting
     */
  private createProductFormGroup(): FormGroup {
    return new FormGroup({
      companyName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
      address: new FormControl('', [Validators.required, Validators.minLength(10)]),
      yearFounded: new FormControl('', [Validators.required, Validators.pattern(/^\d{4}$/)]),
      companyWebsite: new FormControl('', [Validators.required, Validators.pattern(/^(http|https):\/\/[a-z0-9]+([\.-][a-z0-9]+)*\.[a-z]{2,4}(\/[\w\-]+)*\/?$/)]),
      emailAddress: new FormControl('', [Validators.required, Validators.email]),
      countryCode: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
      aboutCompany: new FormControl('', [Validators.required, Validators.minLength(50)]),
      organizationCode: new FormControl('', [Validators.required, Validators.minLength(3)]),
      companySize: new FormControl('', Validators.required),
      industryType: new FormControl('', Validators.required),
    })
  }
}
