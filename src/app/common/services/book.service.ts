import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  getContent(params) {
    const toolUrl = '/detail/1';
    return this.http.get(toolUrl, {params: params});
  }
  getBookManagerList(params) {
    const url = '/book/list';
    return this.http.get(url, {params: params});
  }

  save(item) {
    const url = '/book';
    return this.http.post(url, item);
  }
}
