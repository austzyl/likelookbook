import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {instantiateDefaultStyleNormalizer} from "@angular/platform-browser/animations/src/providers";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {
  }

  queryCategories(params) {
    const url = '/category';
    return this.http.get(url, {params: params});
  }

  queryCategoryById(id) {
    const url = '/category/' + id;
    return this.http.get(url, null);
  }

  save(category) {
    const url = '/category';
    return this.http.post(url, category);
  }

  delete(ids) {
    const url = 'category/del';
    return this.http.post(url, ids);
  }
}
