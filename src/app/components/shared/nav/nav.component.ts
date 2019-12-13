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
        routerLink: ['/category/0']
      },
      {
        label: '榜单',
      },
      {
        label: '我的书架',
        routerLink: ['/shelf']
      }

    ];
    if (this.sessionStorageService.getAuth()) {
      this.isLogin = true;
    }
  }

}
@NgModule({
  imports: [
    CommonModule,
    MenubarModule
  ],
  providers: [
    SessionStorageService
  ],
  exports: [NavComponent],
  declarations: [
    NavComponent
  ]
})
export class NavModule { }
