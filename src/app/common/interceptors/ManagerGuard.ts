import {CanActivate, Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {Injectable} from '@angular/core';

@Injectable()
export class ManagerGuard implements CanActivate {

  constructor(private router: Router, private userService: UserService) {}

  canActivate() {
    if (!this.userService.isManager()) {
      this.router.navigateByUrl('/');
      return false;
    } else {
      return true;
    }
  }
}
