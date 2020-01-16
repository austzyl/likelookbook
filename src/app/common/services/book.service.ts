import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  getContent(params) {
    const url = '/yunqi/book/detail';
    return this.http.post(url, params);
  }
  getBookManagerList(params) {
    const url = '/yunqi/book/list';
    return this.http.get(url, {params: params});
  }

  save(item) {
    const url = '/yunqi/book';
    return this.http.post(url, item);
  }
  books() {
    const url = '/yunqi/book/books';
    return this.http.get(url, {});
  }
  batchSave(params) {
    const url = '/yunqi/book/books';
    return this.http.post(url, params);
  }

  delete(ids) {
    const url = '/yunqi/book/del';
    return this.http.post(url, {ids: ids});
  }
  getOne(id) {
    const url = '/yunqi/book/' + id;
    return this.http.get(url, {});
  }
  getBooksRankings() {
    const url = '/yunqi/book?page=0&size=5';
    return this.http.get(url, {});
  }
}
