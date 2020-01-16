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
               private sessionStorageService: SessionStorageService) { }


  toRegister() {
    this.router.navigate(['/user/register']);
  }
  toLogin() {
    this.router.navigate(['/user/login']);
  }

  logout() {
    this.userService.logout({userId: this.sessionStorageService.getAuth('userId')}).subscribe(res => {
      console.log('logout:', res);
      if (res['success'] === 'true') {
        this.sessionStorageService.clearAuth();
        this.isLogin = false;
        this.isManager = false;
        this.router.navigate(['/home']);
      }
    });
  }

  ngOnInit() {
    this.isLogin = this.userService.isAuthenticated();
    this.isManager = this.userService.isManager();

    this.items =  [
      {
        label: '首页',
        routerLink: ['/']
      },
      {
        label: '分类',
        routerLink: ['/category/0']
      },
      {
        label: '我的书架',
        routerLink: ['/shelf'],
        visible: this.userService.isAuthenticated()
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
      }
    ];

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
export class NavModule { }
