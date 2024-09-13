import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-otp-layout',
  standalone: true,
  imports: [],
  templateUrl: './otp-layout.component.html',
  styleUrl: './otp-layout.component.scss'
})
export class OtpLayoutComponent implements OnInit {
  @Input('company-Email') email: string = "";
  @Output() otpVal = new EventEmitter();

  ngOnInit(): void {
    this.OTPInput();
  }


  OTPInput(): string {
    const inputs: HTMLInputElement[] = Array.from(document.querySelectorAll('#otp > *[id]'));
    let otpValue = '';

    inputs.forEach((input, index) => {
      input.addEventListener('keydown', (event: KeyboardEvent) => {
        if (event.key === "Backspace") {
          input.value = '';
          if (index !== 0) inputs[index - 1].focus();
        } else if (event.keyCode >= 48 && event.keyCode <= 57) {
          input.value = event.key;
          if (index !== inputs.length - 1) inputs[index + 1].focus();
          event.preventDefault();
        } else if (event.keyCode >= 65 && event.keyCode <= 90) {
          input.value = String.fromCharCode(event.keyCode);
          if (index !== inputs.length - 1) inputs[index + 1].focus();
          event.preventDefault();
        }
      });
    });

    otpValue = inputs.map(input => input.value).join('');
    return otpValue;
  }

  verifyOTP() {
    console.log("this.otpCode", this.OTPInput());
    this.otpVal.emit(this.OTPInput());
  }
}
