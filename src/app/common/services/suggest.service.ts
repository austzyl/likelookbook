import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SessionStorageService} from './session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SuggestService {

  constructor(private http: HttpClient, private sessionStorageService: SessionStorageService) { }

  save(params) {
    const url = '/yunqi/suggest/';
    return this.http.post(url, params);
  }

  getUserSuggestCount(id) {
    const url = '/yunqi/suggest/count?userId=' + id;
    return this.http.get(url, {});
  }
}
