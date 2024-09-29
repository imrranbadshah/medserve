import { Component, Inject, NgZone, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { BackToTopComponent } from '../../common/back-to-top/back-to-top.component';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { FooterComponent } from '../../common/footer/footer.component';
import { NavbarComponent } from '../../common/navbar/navbar.component';
import { TopHeaderComponent } from '../../common/top-header/top-header.component';
import { GoogleLoginProvider, GoogleSigninButtonModule, SocialAuthService, SocialLoginModule } from '@abacritt/angularx-social-login';
import { GoogleSigninComponent } from '../../components/google-signin/google-signin.component';
import { catchError, debounceTime, distinctUntilChanged, map, merge, Observable, of, Subject, Subscription, switchMap, tap } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { OtpLayoutComponent } from '../../components/otp-layout/otp-layout.component';
import { HelpersService } from '../../services/helpers/helpers.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ApiService } from '../../services/api/api.service';
import { NgbTypeahead, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { RecaptchaErrorParameters, RecaptchaFormsModule, RecaptchaModule, RecaptchaV3Module } from "ng-recaptcha";

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
    RouterModule,
    TranslateModule,
    NgbTypeaheadModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    RecaptchaV3Module
    // RecaptchaV3Module,
    // RecaptchaModule,
    // RecaptchaFormsModule,
    // GoogleSigninButtonModule
  ],
  templateUrl: './candidate-login.component.html',
  styleUrl: './candidate-login.component.scss',
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CandidateLoginComponent implements OnInit {
  @ViewChild('instance', { static: true }) instance!: NgbTypeahead;
  searching = false;
  searchFailed = false;
  companyEmail!: string;
  isOTPSent: boolean = false;
  isCandidateLogin: string = "candidate";
  registerForms!: FormGroup;
  candidateRegisterForms!: FormGroup;
  authSubscription!: Subscription;
  loginFormGroup!: FormGroup;
  registerationFormGroup!: FormGroup;

  filteredCities: any;

  focusMain$ = new Subject<string>();
  clickMain$ = new Subject<string>();
  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  countryMaster: any;
  constructor(
    private authService: SocialAuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public ngZone: NgZone,
    private fb: FormBuilder,
    private helper: HelpersService,
    private api: ApiService,
    public translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    console.log("this.activatedRoute", this.activatedRoute?.snapshot?.routeConfig?.path);
    this.helper.getUserDetails().subscribe((resp: any) => {
      if (resp && Object.keys(resp).length > 0) {
        this.router.navigateByUrl("/");
      } else {
        if (this.activatedRoute?.snapshot?.routeConfig?.path?.includes("employer")) {
          this.isCandidateLogin = "employer";
        } else {
          this.isCandidateLogin = "candidate";
          this.loginFormGroup = this.fb.group(
            {
              "candidateEmail": ['', [Validators.required, Validators.pattern("^[a-zA-Z ]+$")]],
              "candidatePasswd": ['', [Validators.required, Validators.pattern("^[0-9 ]+$")]],
            }
          )
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

    this.candidateRegisterForms = this.fb.group({
      email: ["", [Validators.required]],
      confirmEmail: ["", [Validators.required]],
      username: ["", [Validators.required]],
      password: ["", [Validators.required]],
      confirmpassword: ["", [Validators.required]],
      notifyEmail: ["", [Validators.required]],
      notifyMobile: ["", [Validators.required]],
      countryCode: ["", [Validators.required]],
      mcountryCode: ["", [Validators.required]],
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      mEmail: ["", [Validators.required]],
      phoneNumber: ["", [Validators.required]],
      nationality: ["", [Validators.required]],
      residenceCountry: ["", [Validators.required]],
      recaptcha: [null, Validators.required],
    })
  }

  // ngOnInit() {

  //   // this.authSubscription = this.authService.authState.subscribe((userObj) => {
  //   //   console.log('userObj', userObj);
  //   //   if (userObj) {
  //   //     let encryptedUserObject: string = encrypt("id", userObj)?.data as string;
  //   //     localStorage.setItem("id", encryptedUserObject);
  //   //     localStorage.setItem("token", userObj.idToken);
  //   //     this.router.navigate(["/candidates-dashboard/personal-forms"]);
  //   //   }
  //   // });
  // }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.getCountryMaster();
    }
  }

  /**
   * @author Imran A
   * @description used to get the formcontrol for validations
   * @param controlName 
   * @returns 
   */
  getControl(controlName: string) {
    return this.candidateRegisterForms.get(controlName) as FormControl;
  }

  /**
   * @description used to call api for country list
   */
  getCountryMaster() {
    this.api.getCountryMaster().subscribe((resp: any) => {
      console.log("getCountryMaster resp", resp)
      this.countryMaster = resp.data.countryList;
    })
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
   * @description used to searching the cities on inputs
   * @param text$ 
   * @returns 
   */
  searchPhCodeMain = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const inputFocus$ = this.focusMain$;
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
  filterCountries(term: any): any[] {
    if (!term) {
      return this.countryMaster.slice(0, 10); // Return initial 10 for empty term
    }

    const filteredCountries = this.countryMaster.filter((country: any) =>
      country.countryName.toLowerCase().indexOf(term.toLowerCase()) > -1
    );

    return filteredCountries.slice(0, 10); // Return first 10 filtered countries
  }

  /**
   * @description used to city selections
   */
  onCitySelect(title: any) {
    console.log("onCitySelect", title);
    const selectedCity = title.item;
    if (selectedCity) {
      let place = selectedCity.split(",");
      this.candidateRegisterForms.get('residenceCountry')?.setValue(place[place.length - 1]);
    }
  }

  /**
 * @description used to search for cities
 */
  searchCities = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => (this.searching = true)),
      switchMap(term => this.getCities(term)),
      tap(() => (this.searching = false)),
      map((resp: any) => {
        return resp.map((city: any) => city.title);
      })
    );
  /**
   * @description API call to get cities based on user input and filter list based on type 1
   */
  getCities(searchTerm: string): Observable<any[]> {
    console.log("searchTerm", searchTerm);
    if (searchTerm.length < 2) {
      return new Observable(observer => observer.next([])); // Return empty array if the input is too short
    }
    const temp = {
      startPage: 1,
      limit: 1000,
      search: searchTerm,
      lastTimeStamp: null
    };

    return this.api.getCities(temp).pipe(
      tap(() => (this.searchFailed = false)),
      catchError(() => {
        this.searchFailed = true;
        return of([]);
      }),
      map((resp: any) => {
        let title = resp.data.list?.filter((city: any) => city.type === 1);
        return title;
      })
    );
  }


  googleSignin(googleWrapper: any) {
    googleWrapper.click();
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
    console.log("type", type)
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
      case "employerRegister":
        className = 'h100vh';
        break;
      case "candidateRegister":
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

  public resolved(captchaResponse: any): void {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  public onError(errorDetails: any): void {
    console.log(`reCAPTCHA error encountered; details:`, errorDetails);
  }

  onCandidateLoginSubmit() {
    console.log(this.loginFormGroup);
    this.router.navigateByUrl("/home-dashboard");
  }

  onEmpRegsiterSubmit() {
    console.log(this.loginFormGroup);
  }

  onCandidateRegsiterSubmit() {
    console.log(this.candidateRegisterForms);
  }
}
