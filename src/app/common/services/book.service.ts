import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  getContent(params) {
    const toolUrl = '/book/detail';
    return this.http.post(toolUrl, params);
  }
  getBookManagerList(params) {
    const url = '/book/list';
    return this.http.get(url, {params: params});
  }

  save(item) {
    const url = '/book';
    return this.http.post(url, item);
  }
  books() {
    const url = '/book/books';
    return this.http.get(url, {});
  }
  batchSave(params) {
    const url = '/book/books';
    return this.http.post(url, params);
  }

  delete(ids) {
    const url = '/book/del';
    return this.http.post(url, {ids: ids});
  }
  getOne(id) {
    const url = '/book/' + id;
    return this.http.get(url, {});
  }
}
