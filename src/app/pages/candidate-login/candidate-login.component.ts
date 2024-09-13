import { Component } from '@angular/core';
import { BackToTopComponent } from '../../common/back-to-top/back-to-top.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
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
  authSubscription!: Subscription;
  companyEmail!: string;
  isOTPSent: boolean = false;
  isCandidateLogin: boolean = false;
  constructor(
    private authService: SocialAuthService,
    private activatedRoute: ActivatedRoute,
    private helper: HelpersService) {
    console.log("this.activatedRoute", this.activatedRoute?.snapshot?.routeConfig?.path);
    if (this.activatedRoute?.snapshot?.routeConfig?.path?.includes("candidate")) {
      this.isCandidateLogin = true;
    } else {
      this.isCandidateLogin = false;
    }
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }

  ngOnInit() {
    this.authSubscription = this.authService.authState.subscribe((user) => {
      console.log('user', user);
      user && this.helper.saveToStorage(user);
    });
  }

  googleSignin(googleWrapper: any) {
    googleWrapper.click();
  }

  onCompanyEmailSubmit() {
    console.log("comapny", this.companyEmail);
    if (this.companyEmail) {
      this.isOTPSent = true;
    }
  }


  verifyOTP(val: string) {
    console.log(val);
  }


}
