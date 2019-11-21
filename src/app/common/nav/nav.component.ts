import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {Router} from '@angular/router';
import {SessionStorageService} from '../services/session-storage.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  items: MenuItem[];

  @Output()
  logoutEvent: EventEmitter<any> = new EventEmitter();
  isLogin = false;

  constructor(private router: Router,
               private sessionStorageService: SessionStorageService) { }


  toRegister() {
    console.log('auth:', this.sessionStorageService.getAuth());

    this.router.navigate(['/user/signup']);
  }
  toLogin() {
    console.log('auth:', this.sessionStorageService.getAuth());

    this.router.navigate(['/user/login']);
  }

  logout() {
    this.sessionStorageService.clearAll();
    console.log('auth:', this.sessionStorageService.getAuth());
    this.router.navigate(['/user/login']);
  }

  ngOnInit() {
    this.items =  [
      {
        label: '首页',
        routerLink: ['/']
      },
      {
        label: '分类',
        routerLink: ['/category/category']
      },
      {
        label: '榜单',
      },
      {
        label: '我的书架'
      }

    ];
    if (this.sessionStorageService.getAuth()) {
      this.isLogin = true;
    }
  }

}
