import { Component, NgZone } from '@angular/core';
import { BackToTopComponent } from '../../common/back-to-top/back-to-top.component';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { FooterComponent } from '../../common/footer/footer.component';
import { NavbarComponent } from '../../common/navbar/navbar.component';
import { TopHeaderComponent } from '../../common/top-header/top-header.component';
import { GoogleLoginProvider, GoogleSigninButtonModule, SocialAuthService, SocialLoginModule } from '@abacritt/angularx-social-login';
import { GoogleSigninComponent } from '../../components/google-signin/google-signin.component';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { OtpLayoutComponent } from '../../components/otp-layout/otp-layout.component';
import { HelpersService } from '../../services/helpers/helpers.service';
import { CommonModule } from '@angular/common';
import { encrypt } from '../../services/sharedFunctions/sharedFunctions';

@Component({
  selector: 'app-candidate-login',
  standalone: true,
  imports: [
    RouterLink,
    TopHeaderComponent,
    NavbarComponent,
    FooterComponent,
    BackToTopComponent,
    SocialLoginModule,
    GoogleSigninComponent,
    FormsModule,
    OtpLayoutComponent,
    ReactiveFormsModule,
    CommonModule,
    RouterModule
    // GoogleSigninButtonModule
  ],
  templateUrl: './candidate-login.component.html',
  styleUrl: './candidate-login.component.scss',
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CandidateLoginComponent {
  companyEmail!: string;
  isOTPSent: boolean = false;
  isCandidateLogin: string = "employer";
  registerForms!: FormGroup;
  authSubscription!: Subscription;
  constructor(
    private authService: SocialAuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private helper: HelpersService,
    private fb: FormBuilder,
    public ngZone: NgZone
  ) {
    console.log("this.activatedRoute", this.activatedRoute?.snapshot?.routeConfig?.path);
    this.helper.getUserDetails().subscribe((resp: any) => {
      if (Object.keys(resp).length > 0) {
        this.router.navigateByUrl("/");
      } else {
        if (this.activatedRoute?.snapshot?.routeConfig?.path?.includes("employer")) {
          this.isCandidateLogin = "employer";
        } else {
          this.isCandidateLogin = "candidate";
        }
      }
    })

    this.registerForms = this.fb.group({
      companyName: ["", [Validators.required]],
      contactName: ["", [Validators.required]],
      mobileNumber: ["", [Validators.required]],
      email: ["", [Validators.required]],
      location: ["", [Validators.required]],
    })
  }

  ngOnInit() {
    // this.authSubscription = this.authService.authState.subscribe((userObj) => {
    //   console.log('userObj', userObj);
    //   if (userObj) {
    //     let encryptedUserObject: string = encrypt("id", userObj)?.data as string;
    //     localStorage.setItem("id", encryptedUserObject);
    //     localStorage.setItem("token", userObj.idToken);
    //     this.router.navigate(["/candidates-dashboard/personal-forms"]);
    //   }
    // });
  }

  googleSigninLogin(type?: string) {
    this.authService.authState.subscribe(async (user) => {
      console.log("user==>", user);
      if (user) {
        // tt.unsubscribe();
        this.helper.saveToStorage(user);
        this.router.navigateByUrl("/candidates-dashboard");
      } else {
        if (!type) {
          await this.helper.refreshToken();
        }
        this.googleSigninLogin();
      }
    });
  }

  googleSignin(googleWrapper: any) {
    googleWrapper.click();
    // this.ngZone.run(() => {
    console.log("navigating", googleWrapper)
    // this.router.navigateByUrl("/candidates-dashboard/personal-forms");
    //   setTimeout(() => {
    //     this.router.navigate(["/"]);
    //   }, 2000);
    // })
    this.helper.isUserTokenValid('buttonClick');
  }

  gotoforms() {
    this.router.navigateByUrl("/candidates-dashboard/personal-forms");
  }

  onCompanyEmailSubmit() {
    console.log("comapny", this.companyEmail);
    if (this.companyEmail) {
      this.isOTPSent = true;
    }
  }

  verifyOTP(val: string) {
    console.log(val);
    this.router.navigateByUrl("/employers-dashboard")
  }

  showCompanyRegister(type: string) {
    this.isCandidateLogin = type;
  }

  showCompanyLogin() {
    this.helper.show("User Register Success", "Please Login to continue", "success");
    this.isCandidateLogin = "employer";
  }

  getDynamicHeight() {
    let className;
    switch (this.isCandidateLogin) {
      case "candidate":
        className = 'hcalc100';
        break;
      case "employer":
        className = 'hcalc100';
        break;
      case "companyRegister":
        className = 'h100vh';
        break;
      default:
        className = 'hcalc100';
    }
    return className;
    // if (this.isCandidateLogin == ""){
    //   return ""
    // }else if()
  }

  // ngOnDestroy(): void {
  //   if (this.helper.authSubscription) {
  //     this.helper.authSubscription.unsubscribe();
  //   }
  // }
}
