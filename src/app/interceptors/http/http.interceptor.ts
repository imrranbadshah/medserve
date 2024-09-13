import { HttpInterceptorFn, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LanguageService } from '../../services/language/language.service';
import { inject, PLATFORM_ID } from '@angular/core';
import * as crypto from "crypto-js";
import { HelpersService } from '../../services/helpers/helpers.service';
import { isPlatformBrowser } from '@angular/common';
import { getIpaddress, encrypt, decrypt } from '../../services/sharedFunctions/sharedFunctions';

const aKey = 'T@MiCr097124!iCR';
export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  console.log("HTTP-Interceptor-req", req);

  try {
    console.log("PLATFORM_ID", PLATFORM_ID);
    let currentLanguage;
    let _LanguageService = inject(LanguageService);
    let timestamp = Date.now();
    let platformId = inject(PLATFORM_ID)
    let ip = '';
    let region = '';
    let ipObj = getIpaddress(platformId);
    let hash = crypto.SHA512(timestamp + ip + region + aKey);
    let language = _LanguageService.getLanguagesList() || 1;
    if (isPlatformBrowser(platformId))
      currentLanguage = JSON.parse(localStorage.getItem('currentLanguage') as string);
    if (ipObj) {
      ip = ipObj['ip'];
      region = currentLanguage && currentLanguage.country_id || ipObj['country'];
    }
    try {
      if (isPlatformBrowser(platformId))
        sessionStorage.removeItem('resId')
    }
    catch (err) {
      console.log(err)
    }
    hash = crypto.SHA512(timestamp + ip + region + aKey);
    if (req.body instanceof FormData) {
      req = req.clone({
        body: req.body
      })
    }
    else {
      if (req && req.body) {
        req = req.clone({
          body: encrypt(aKey, req.body)
        })
      }
    }
    const authReq = req.clone({
      setHeaders: {
        ip: ip.toString(),
        region: region.toString(),
        hash: hash.toString(),
        lngId: language.toString() || '1',
        timestamp: timestamp.toString(),
        isCVMine: "1"
      },
    })
    return next(authReq).pipe(tap((event: any) => {
      if (event.type === HttpEventType.Response) {
        if (event && event.body && event.body['message'] && !event.body['status']) {
          // notification.error(event.body['message'], 'Close', 5000);
        }

        if (event && event.body && event.body['data'] && typeof event.body['data'] == "string") {
          // this.user = this._session.getSessionData();
          // if (this.user && this.user.secretkey) {
          //   this.secretKey = this.user.secretkey;
          //   // if (give_enc_body == '1' || give_enc_body == 1) {
          //   //   event.body.encData = event.body.data;
          //   // }
          //   event.body.data = this.getV3(this.secretKey, event.body.data);
          //   if (window.location.protocol == "http:") {
          //   }
          // }
          // else {
          event.body['data'] = decrypt(aKey, event.body['data']);
          // }
          console.log(event.body)

        }// notification.error(event.body.message, 'Close', 5000)
        console.log(req.url, 'returned a response with status', event.status);
      }
    }))
  }
  catch (err) {
    return next(req)
  }
};
