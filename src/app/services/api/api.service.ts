import { HttpClient, HttpEventType } from '@angular/common/http';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from './endPointsURL';
import { getIpaddress } from '../sharedFunctions/sharedFunctions';
import { isPlatformBrowser } from '@angular/common';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_URL = environment.SERVER_URL;
  // platformId = inject(PLATFORM_ID)
  ipaddress: any;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object,) {
    this.ipaddress = {
      ip: "52.2.21.14",
      country: "US",
      timestamp: 1726736078529,
    };
    // this.ipaddress = getIpaddress(this.platformId);
  }

  getLanguagesList() {
    //config/language
    return this.http.get(this.API_URL + 'config/language');
  }

  getCountryMaster() {
    const timestamp = new Date().getTime();
    return this.http.get<any[]>(`${this.API_URL}icrweb/countryMaster?ip=${this.ipaddress.ip}&country=${this.ipaddress.country}`, { params: { timestamp: timestamp.toString() } });
  }

  getCities(dataParams: any) {
    return this.http.post<any[]>(`${this.API_URL}icrweb/home/get_city_list?lngId=1&sellerShortCode=IND`, dataParams);
  }

  uploadtoServer(formData: FormData) {
    return this.http.post(`${this.API_URL}uploadFile`, formData, {
      reportProgress: true,
      observe: 'events',
    })
  }
}
