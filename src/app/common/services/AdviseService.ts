import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdviseService {

  constructor(private http: HttpClient) { }

  saveAdvise(item) {
    const url =  '/yunqi/sys/advise';
    return this.http.post(url, item);
  }
}
