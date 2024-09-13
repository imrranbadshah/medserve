import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { decrypt, encrypt } from '../sharedFunctions/sharedFunctions';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {
  countryList$: BehaviorSubject<any> = new BehaviorSubject(null);
  private userSubject = new BehaviorSubject<any>(null);
  private userObject = new BehaviorSubject<any>({});
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }


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


  formatcDate(value: string) {
    const selectedDateObj = new Date(value);
    const day = selectedDateObj.getDate();
    const month = selectedDateObj.toLocaleString('en-US', { month: 'short' });
    const year = selectedDateObj.getFullYear();
    console.log(`${day}-${month}-${year}`);
    return `${day}-${month}-${year}`;
  }

  saveToStorage(userObj: any) {
    if (!isPlatformBrowser(this.platformId)) {
      return
    }
    let encryptedUserObject: string = encrypt("id", userObj)?.data as string;
    localStorage.setItem("id", encryptedUserObject);
    localStorage.setItem("token", userObj.idToken);
  }

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

  getDummyImage() {
    return "img/icons/user.svg";
  }


}
