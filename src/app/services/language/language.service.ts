import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  languageList: any;


  constructor(private api: ApiService) { }

  getLanguagesList() {
    return new Observable((obs) => {
      if (this.languageList) {
        obs.next(this.languageList);
      } else {
        this.api.getLanguagesList().subscribe((res: any) => {
          if (res && res['data'] && res['data'].language_list)
            this.languageList = res['data'].language_list;
          else
            this.languageList = [];
          obs.next(this.languageList);
        })
      }
    })
  }


}
