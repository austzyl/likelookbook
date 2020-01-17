import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SessionStorageService} from './session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private sessionStorageService: SessionStorageService) { }

  login(params) {
    const url = '/yunqi/user/login';
    return this.http.post(url, params);
  }

  queryUsers(params) {
    const url = '/yunqi/user';
    return this.http.get(url, {params: params});
  }
  logout(params) {
    const url = 'yunqi/user/logout';
    return this.http.post(url, params);
  }
  register(params) {
    const url = 'yunqi/user';
    return this.http.post(url, params);
  }
  forgotPassword(user) {
    const url = 'yunqi/user/forgotPassword';
    return this.http.post(url, user);
  }

  checkUser(userId) {
    const url = 'yunqi/user/checkUser?userId=' + userId;
    return this.http.get(url, {});
  }

  isAuthenticated() {
    return true === this.sessionStorageService.getAuth('isa');
  }
  isManager() {
    return true === this.sessionStorageService.getAuth('ism');
  }

}
