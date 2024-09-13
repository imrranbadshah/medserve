import { Component } from '@angular/core';
import { DynamicFormsComponent } from '../../components/dynamic-forms/dynamic-forms.component';
import { ApiService } from '../../services/api/api.service';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { HelpersService } from '../../services/helpers/helpers.service';

@Component({
  selector: 'app-cd-experiences',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './cd-experiences.component.html',
  styleUrl: './cd-experiences.component.scss'
})
export class CdExperiencesComponent {
  experienceFormGroup!: FormGroup;
  constructor(private fb: FormBuilder, private helper: HelpersService) {
    this.experienceFormGroup = this.fb.group(
      {
        companyName: ['', [Validators.required]],
        address: ['', [Validators.required]],
        jobTitle: ['', [Validators.required, Validators.pattern("^[a-zA-Z ]+$")]],
        fromDate: ['', [Validators.required]],
        toDate: ['', [Validators.required]],
        industry: ['', [Validators.required]],
        jobResponsibilities: ['', [Validators.required], Validators.pattern("^[a-zA-Z ]+$")],
      }
    )
  }

  formatDate(date: any, formControl: string) {
    let formatedDate = this.helper.formatcDate(date.target.value)
    this.experienceFormGroup.patchValue({ [formControl]: formatedDate });
  }

  /**
 * @author Imran A
 * @description used to get the formcontrol for validations
 * @param controlName 
 * @returns 
 */
  getControl(controlName: string) {
    return this.experienceFormGroup.get(controlName) as FormControl;
  }

  onSubmit() {
    console.log(this.experienceFormGroup.value);
  }
}