import { Component } from '@angular/core';
import { BackToTopComponent } from '../../common/back-to-top/back-to-top.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FooterComponent } from '../../common/footer/footer.component';
import { NavbarComponent } from '../../common/navbar/navbar.component';
import { TopHeaderComponent } from '../../common/top-header/top-header.component';
import { SocialAuthService, SocialLoginModule } from '@abacritt/angularx-social-login';
import { GoogleSigninComponent } from '../../components/google-signin/google-signin.component';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { OtpLayoutComponent } from '../../components/otp-layout/otp-layout.component';
import { HelpersService } from '../../services/helpers/helpers.service';

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
    OtpLayoutComponent
  ],
  templateUrl: './candidate-login.component.html',
  styleUrl: './candidate-login.component.scss',
})
export class CandidateLoginComponent {
  companyEmail!: string;
  isOTPSent: boolean = false;
  isCandidateLogin: string = "employer";
  constructor(
    private authService: SocialAuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private helper: HelpersService) {
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
  }

  ngOnInit() {

  }

  googleSignin(googleWrapper: any) {
    googleWrapper.click();
    this.helper.isUserTokenValid('buttonClick');
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

  showCompanyRegister() {
    this.isCandidateLogin = "companyRegister";
  }
  showCompanyLogin() {
    this.isCandidateLogin = "employer";
  }
}
