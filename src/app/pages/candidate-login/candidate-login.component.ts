import { Component } from '@angular/core';
import { BackToTopComponent } from '../../common/back-to-top/back-to-top.component';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../../common/footer/footer.component';
import { NavbarComponent } from '../../common/navbar/navbar.component';
import { TopHeaderComponent } from '../../common/top-header/top-header.component';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { GoogleSigninComponent } from '../../components/google-signin/google-signin.component';
import { Subscription } from 'rxjs';

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
  ],
  templateUrl: './candidate-login.component.html',
  styleUrl: './candidate-login.component.scss',
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('836629619269-92cv29guqpku6qmp593l0rjs01i7aiu9.apps.googleusercontent.com', {
              scopes: 'openid profile email',
            }),
          },
        ],
        onError: (err) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    }
  ],
})
export class CandidateLoginComponent {
  authSubscription!: Subscription;

  constructor(private authService: SocialAuthService) { }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  ngOnInit() {
    // this.authSubscription = this.authService.authState.subscribe((user) => {
    //   console.log('user', user);
    // });
  }

  googleSignin(googleWrapper: any) {
    // googleWrapper.click();
  }
}
