import { Component } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { DynamicFormsComponent } from '../../components/dynamic-forms/dynamic-forms.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HelpersService } from '../../services/helpers/helpers.service';

@Component({
  selector: 'app-cd-academics',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './cd-academics.component.html',
  styleUrl: './cd-academics.component.scss'
})
export class CdAcademicsComponent {
  academicsFormGroup!: FormGroup;
  constructor(private fb: FormBuilder, private helper: HelpersService) {
    this.academicsFormGroup = this.fb.group(
      {
        fullname: ['', [Validators.required, Validators.pattern("^[a-zA-Z ]+$")]],
        instituteName: ['', [Validators.required, Validators.pattern("^[a-zA-Z ]+$")]],
        fromDate: ['', [Validators.required]],
        toData: ['', [Validators.required]],
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
    return this.academicsFormGroup.get(controlName) as FormControl;
  }

  formatDate(date: any, formControl: string) {
    let formatedDate = this.helper.formatcDate(date.target.value)
    this.academicsFormGroup.patchValue({ [formControl]: formatedDate });
  }

  onSubmit() {
    console.log(this.academicsFormGroup.value);
  }
}
