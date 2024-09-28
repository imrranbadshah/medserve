import { Component, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { catchError, debounceTime, distinctUntilChanged, filter, map, merge, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { NgbTypeahead, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HelpersService } from '../../services/helpers/helpers.service';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { FileUploadsComponent } from '../../components/file-uploads/file-uploads.component';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-cd-schoolings',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TranslateModule,
    NgbTypeaheadModule,
    RouterLink,
    FileUploadsComponent,
    NgFor
  ],
  templateUrl: './cd-schoolings.component.html',
  styleUrl: './cd-schoolings.component.scss'
})
export class CdSchoolingsComponent {

  schoolingFormGroup!: FormGroup;
  schoolsList: any[] = [
    {
      id: 1,
      value: "School 1"
    },
    {
      id: 2,
      value: "School 2"
    },
    {
      id: 3,
      value: "School 3"
    },
    {
      id: 4,
      value: "School 4"
    },
  ];

  constructor(private fb: FormBuilder, private helper: HelpersService, private api: ApiService) {
    this.schoolingFormGroup = this.fb.group(
      {
        "obtainedSchool": ['', [Validators.required, Validators.pattern("^[a-zA-Z ]+$")]],
        "secondarySchool": ['', [Validators.required, Validators.pattern("^[a-zA-Z ]+$")]],
        "graduationDate": ['', [Validators.required]],
      }
    )
  }

  /**
   * @author Imran A
   * @description used to get the formcontrol for validations
   * @param controlName 
   * @returns 
   */
  getControl(controlName: string) {
    return this.schoolingFormGroup.get(controlName) as FormControl;
  }

  /**
  * @description Used to format date
  * @param date 
  * @param formControl 
  */
  formatDate(date: any, formControl: string, type: string) {
    let formatedDate = this.helper.formatDate(date.target.value);
    this.schoolingFormGroup.patchValue({ [formControl]: formatedDate });
  }

  

  /**
  * @description Used to submit the form
  */
  onSubmitSchoolForm() {
    console.log(this.schoolingFormGroup.value);
  }

}
