import {CanActivate, Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthenticatedGuard implements CanActivate {

  constructor(private router: Router, private userService: UserService) {}

  canActivate() {
    if (!this.userService.isAuthenticated()) {
      console.log('用户未登录');
      this.router.navigateByUrl('/sys/login');
      return false;
    } else {
      return true;
    }
  }
}
