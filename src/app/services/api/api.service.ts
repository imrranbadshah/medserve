import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from './endPointsURL';
import { getIpaddress } from '../sharedFunctions/sharedFunctions';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_URL = environment.SERVER_URL;
  platformId = inject(PLATFORM_ID)
  ipaddress: any;
  constructor(private http: HttpClient) {
    this.ipaddress = getIpaddress(this.platformId);
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


  getFormsInputs(formName: string) {
    return this.http.get<any>(`jsons/${formName}.json`);
  }
}
