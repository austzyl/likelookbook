import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {RouterModule} from '@angular/router';
import {GalleriaModule} from 'primeng/galleria';
import {NavModule} from '../shared/nav/nav.component';
import {MenubarModule} from 'primeng/menubar';
import {PanelModule} from 'primeng/panel';
import {CommonCategoryComponent} from '../shared/common-category/common-category.component';
import {CardModule, RatingModule} from 'primeng/primeng';
import {FormsModule} from '@angular/forms';
import {AdviseModule} from '../shared/advise/advise.component';

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
    FormsModule,
    RouterModule.forChild(ROUTES),
    GalleriaModule,
    MenubarModule,
    PanelModule,
    NavModule,
    RatingModule,
    AdviseModule,
    CardModule
  ],
  exports: [
    HomeComponent],
  declarations: [
    HomeComponent,
    CommonCategoryComponent
  ]
})
export class HomeModule { }
