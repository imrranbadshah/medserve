import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { DynamicFormsComponent } from '../../components/dynamic-forms/dynamic-forms.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HelpersService } from '../../services/helpers/helpers.service';
import { catchError, debounceTime, distinctUntilChanged, filter, map, merge, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { NgbTypeahead, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { FileUploadsComponent } from '../../components/file-uploads/file-uploads.component';

@Component({
  selector: 'app-cd-user-info',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgbTypeaheadModule,
    TranslateModule,
    FileUploadsComponent
  ],
  templateUrl: './cd-user-info.component.html',
  styleUrl: './cd-user-info.component.scss'
})
export class CdUserInfoComponent implements OnInit {
  @ViewChild('instance', { static: true }) instance!: NgbTypeahead;
  searching = false;
  searchFailed = false;
  userInfoFormGroup!: FormGroup;
  countryMaster: any;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  constructor(private fb: FormBuilder, private helper: HelpersService, private api: ApiService) {
    this.userInfoFormGroup = this.fb.group(
      {
        firstName: ['', [Validators.required, Validators.pattern("^[a-zA-Z ]+$")]],
        lastName: ['', [Validators.required, Validators.pattern("^[a-zA-Z ]+$")]],
        dateOfBirth: ['', [Validators.required]],
        countryCode: ['', [Validators.required]],
        phoneNumber: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,3}$')]],
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
    return this.userInfoFormGroup.get(controlName) as FormControl;
  }

  /**
   * @description used to call api for country list
   */
  async getCountryMaster() {
    this.api.getCountryMaster().then((resp: any) => {
      console.log("getCountryMaster resp", resp)
      this.countryMaster = resp.data.countryList;
    })
    // this.countryMaster = await this.api.getCountryMaster();
  }

  /**
* @description Used to format date
* @param date 
* @param formControl 
*/
  formatDate(date: any, formControl: string) {
    let formatedDate = this.helper.formatDate(date.target.value);
    this.userInfoFormGroup.patchValue({ [formControl]: formatedDate });
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
    console.log(this.userInfoFormGroup.value);
  }
}
