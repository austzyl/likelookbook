import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {RouterModule} from '@angular/router';
import {GalleriaModule} from 'primeng/galleria';
import {NavComponent} from '../../common/nav/nav.component';
import {MenubarModule} from 'primeng/menubar';
import {SessionStorageService} from '../../common/services/session-storage.service';
import {PanelModule} from 'primeng/panel';
import {CommonCategoryComponent} from '../../common/common-category/common-category.component';

export const ROUTES = [
  {
    path: '',
    component: HomeComponent
    // canActivate: [AuthenticatedGuard]
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    GalleriaModule,
    MenubarModule,
    PanelModule
  ],
  exports: [
    HomeComponent
  ],
  declarations: [
    HomeComponent,
    NavComponent,
    CommonCategoryComponent
  ],
  providers: [
    SessionStorageService
  ],
})
export class HomeModule { }
