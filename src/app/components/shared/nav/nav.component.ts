import {Component, EventEmitter, NgModule, OnInit, Output} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {Router, RouterModule} from '@angular/router';
import {SessionStorageService} from '../../../common/services/session-storage.service';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
  ButtonModule,
  ContextMenuModule,
  DropdownModule,
  InputTextModule,
  MenubarModule,
  TreeModule,
  TreeTableModule
} from 'primeng/primeng';
import {ToastModule} from 'primeng/toast';
import {TableModule} from 'primeng/table';
import {CategoryComponent} from '../../category/category.component';
import {ROUTES} from '../../category/category.module';
import {UserService} from '../../../common/services/user.service';

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
  isManager = false;

  constructor(private router: Router,
              private userService: UserService,
              private sessionStorageService: SessionStorageService) {
  }

  toLogin() {
    this.router.navigate(['/user/login']);
  }

  logout() {
    if (!this.sessionStorageService.getAuth('userId')) {
      this.router.navigate(['/home']);
      return;
    }
    this.userService.logout({userId: this.sessionStorageService.getAuth('userId')}).subscribe(res => {
      // console.log('logout:', res);
      if (res['success'] === 'true') {
        this.sessionStorageService.clearAuth();
        this.isLogin = false;
        this.isManager = false;
        this.router.navigate(['/home']);
      }
    });
  }

  ngOnInit() {

    // 验证导航退出和登录状态
    this.userService.checkUser(this.sessionStorageService.getAuth('userId')).subscribe(res => {
      if (res['success'] === 'true') {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
      this.isManager = (this.sessionStorageService.getAuth('userId') === '402880e66fa9c954016fa9e1d36f0002');
      this.items = [
        {
          label: '首页',
          routerLink: ['/']
        },
        {
          label: '找书',
          routerLink: ['/category/0']
        },
        {
          label: '我的书架',
          routerLink: ['/shelf'],
        },
        {
          label: '书籍管理',
          routerLink: ['/sys'],
          visible: this.isManager
        },
        {
          label: '分类管理',
          routerLink: ['/sys/category'],
          visible: this.isManager
        },
        {
          label: '用户管理',
          routerLink: ['/sys/user'],
          visible: this.isManager
        },
        {
          label: '建议反馈',
          routerLink: ['/suggest']
        },
      ];
    });
  }

}

@NgModule({
  imports: [
    CommonModule,
    MenubarModule
  ],
  providers: [],
  exports: [NavComponent],
  declarations: [
    NavComponent
  ]
})
export class NavModule {
}
