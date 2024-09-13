import {
  Component,
  OnChanges,
  Input,
  ChangeDetectionStrategy,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';


interface JsonFormValidators {
  min?: number;
  max?: number;
  required?: boolean;
  requiredTrue?: boolean;
  email?: boolean;
  minLength?: boolean;
  maxLength?: boolean;
  pattern?: string;
  nullValidator?: boolean;
}
interface JsonFormControlOptions {
  min?: string;
  max?: string;
  step?: string;
  icon?: string;
}
interface JsonFormControls {
  name: string;
  label: string;
  value: string;
  type: string;
  options?: JsonFormControlOptions;
  required: boolean;
  validators: JsonFormValidators;
}
export interface JsonFormData {
  controls: JsonFormControls[];
}

@Component({
  selector: 'app-dynamic-forms',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './dynamic-forms.component.html',
  styleUrl: './dynamic-forms.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFormsComponent implements OnChanges {
  @Input('jsonFormData') jsonFormData!: JsonFormData;
  @Input('styleClass') styleClass!: string;
  formFields: any[] = [];
  public form: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['jsonFormData'] && changes['jsonFormData'].currentValue) {
      this.createFormFields(this.jsonFormData);
    }
  }


  /**
   * @description used to get control name for validating FormInputs
   * @param controlName 
   * @returns 
   */
  getControl(controlName: string) {
    return this.form.get(controlName) as FormControl;
  }

  /**
   * @description used to create inputs based on JSON files
   * @param fields 
   */
  createFormFields(fields: any) {
    this.form = this.fb.group({});  // Reset form group for new structure
    this.formFields = fields;
    fields.forEach((field: any) => {
      const control = this.fb.control(
        '',  // Default empty value
        this.bindValidators(field.validators || {})
      );
      this.form.addControl(field.name, control);
    });
  }

  /**
   * @description used to bind validators to the inputs
   * @param validators
   */
  bindValidators(validators: any) {
    const validatorFns = [];
    if (validators.required) {
      validatorFns.push(Validators.required);
    }
    if (validators.minLength) {
      validatorFns.push(Validators.minLength(validators.minLength));
    }
    if (validators.maxLength) {
      validatorFns.push(Validators.maxLength(validators.maxLength));
    }
    if (validators.email) {
      validatorFns.push(Validators.email);
    }
    if (validators.pattern) {
      validatorFns.push(Validators.pattern(validators.pattern));
    }
    return validatorFns;
  }

  /**
   * @description used to submit the forms and pass it back to called components
   */
  onSubmit() {
    console.log(this.form);
  }

}
