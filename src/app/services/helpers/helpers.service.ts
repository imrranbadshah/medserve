import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { decrypt, encrypt } from '../sharedFunctions/sharedFunctions';
import { GoogleLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
import { Toast } from '../../models/toast-models';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {
  authSubscription!: Subscription;
  countryList$: BehaviorSubject<any> = new BehaviorSubject(null);
  private userSubject = new BehaviorSubject<any>(null);
  private userObject = new BehaviorSubject<any>({});
  toasts: Toast[] = [];
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private authService: SocialAuthService) { }


  /**
   * @description Used to store the IP to local storage
   * @returns 
   */
  setIPToStorage() {
    let ipobject = {};
    let res: BehaviorSubject<any> = new BehaviorSubject(null);
    if (isPlatformBrowser(this.platformId)) {
      ipobject = JSON.parse(localStorage.getItem('ipobject') as string);
    }
    if (ipobject) {
      res.next(ipobject)
      return res.asObservable()
    } else {
      if (isPlatformBrowser(this.platformId)) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://api.country.is/', true);
        xhr.responseType = 'json';
        xhr.onreadystatechange = function (e) {
          if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            console.log(xhr.response)
            if (xhr.response) {
              localStorage.setItem('ipobject', JSON.stringify(xhr.response));
            }
            res.next(xhr.response)
          }
        };
        xhr.send()
        return res.asObservable()
      }
      else {
        return null
      }
    }
  }

  /**
   * @description Used to formate date from mm/dd/yyyy to eg. 12-mar-2024
   * @param value 
   * @returns 
   */
  formatcDate(value: string) {
    const selectedDateObj = new Date(value);
    const day = selectedDateObj.getDate();
    const month = selectedDateObj.toLocaleString('en-US', { month: 'short' });
    const year = selectedDateObj.getFullYear();
    console.log(`${day}-${month}-${year}`);
    return `${day}-${month}-${year}`;
  }

  /**
   * @description used to save the user details to storage with encryptions
   */
  saveToStorage(userObj: any) {
    if (!isPlatformBrowser(this.platformId)) {
      return
    }
    let encryptedUserObject: string = encrypt("id", userObj)?.data as string;
    localStorage.setItem("id", encryptedUserObject);
    localStorage.setItem("token", userObj.idToken);
  }

  /**
  * @description used to get the user token from storage
  */
  getUserToken() {
    if (!isPlatformBrowser(this.platformId)) {
      return
    }
    const storedData = localStorage.getItem('token');
    if (storedData) {
      this.userSubject.next(storedData);
    }
    return this.userSubject.asObservable();
  }

  /**
  * @description used to get the user details from storage with decryptions
  */
  getUserDetails() {
    if (!isPlatformBrowser(this.platformId)) {
      return this.userObject.asObservable();
    }
    const storedData = localStorage.getItem('id');
    if (storedData) {
      let encryptedUserObject: any = decrypt("id", storedData);
      this.userObject.next(encryptedUserObject);
    }
    return this.userObject.asObservable();
  }

  /**
   * @description Used to get and show dummy images incase the image in UI gets error
   * @returns 
   */
  getDummyImage() {
    return "img/icons/user.svg";
  }

  /**
   * @description to check if the user token is valid or not 
   */
  isUserTokenValid() {
    this.authSubscription = this.authService.authState.subscribe(async (user) => {
      console.log('user', user);
      if (user) {
        this.saveToStorage(user);
      } else {
        await this.refreshToken();
        this.isUserTokenValid();
      }
    });
  }

  /**
   * @description Used to refresh the current token if the token expires
   * @returns 
   */
  async refreshToken(): Promise<boolean> {
    await this.authService.refreshAccessToken(GoogleLoginProvider.PROVIDER_ID);
    return true;
  }

  /**
   * @description used to show the toast message element
   * @param title 
   * @param message 
   * @param type 
   * @param delay 
   */
  show(title: string, message: string, type: 'success' | 'error' | 'warning', delay = 5000) {
    this.toasts.push({ title, message, type, delay });
    setTimeout(() => this.remove(this.toasts[0]), delay);
  }

  /**
   * @description used to remove the toast element
   */
  remove(toast: Toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

}
