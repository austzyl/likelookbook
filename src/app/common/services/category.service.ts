import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {
  }

  queryCategories(params) {
    const url = '/yunqi/category';
    return this.http.get(url, {params: params});
  }

  queryCategoryById(id) {
    const url = '/yunqi/category/' + id;
    return this.http.get(url, {params: {}});
  }

  save(category, parentId) {
    const url = '/yunqi/category/' + parentId;
    return this.http.post(url, category);
  }

  delete(ids) {
    const url = '/yunqi/category/del';
    return this.http.post(url, ids);
  }
  categoryTree(pid) {
    const url = '/yunqi/category/tree/' + pid;
    return this.http.get(url, {params: {}});
  }

  categories(pid, current, size) {
    const url = '/yunqi/category/' + pid + '/' + current + '/' + size;
    return this.http.get(url, {});
  }
}
