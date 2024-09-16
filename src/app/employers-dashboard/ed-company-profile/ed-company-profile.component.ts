import { Component, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { HelpersService } from '../../services/helpers/helpers.service';
import { FileUploadsComponent } from '../../components/file-uploads/file-uploads.component';
import { NgbTypeahead, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, map, merge, Observable, Subject } from 'rxjs';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-ed-company-profile',
  standalone: true,
  imports: [RouterLink, NgbTypeaheadModule, ReactiveFormsModule, TranslateModule, FileUploadsComponent],
  templateUrl: './ed-company-profile.component.html',
  styleUrl: './ed-company-profile.component.scss'
})
export class EdCompanyProfileComponent implements OnInit {
  @ViewChild('instance', { static: true }) instance!: NgbTypeahead;
  searching = false;
  searchFailed = false;
  companyFormGroup!: FormGroup;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  countryMaster: any;
  constructor(private fb: FormBuilder, private api: ApiService, private helper: HelpersService) {
    this.companyFormGroup = this.fb.group({
      companyName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      address: ['', [Validators.required, Validators.minLength(10)]],
      yearFounded: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
      companyWebsite: ['', [Validators.required, Validators.pattern(/^(http|https):\/\/[a-z0-9]+([\.-][a-z0-9]+)*\.[a-z]{2,4}(\/[\w\-]+)*\/?$/)]],
      emailAddress: ['', [Validators.required, Validators.email]],
      countryCode: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      aboutCompany: ['', [Validators.required, Validators.minLength(50)]],
      organizationCode: ['', [Validators.required, Validators.minLength(3)]],
      companySize: ['', Validators.required],
      industryType: ['', Validators.required],
    });
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
    return this.companyFormGroup.get(controlName) as FormControl;
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
    console.log(this.companyFormGroup.value);
  }
}
