import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DetailComponent} from './detail.component';
import {RouterModule} from '@angular/router';
import {GrowlModule} from 'primeng/growl';
export const ROUTES = [
  {
    path: '',
    component: DetailComponent
    // canActivate: [AuthenticatedGuard]
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    GrowlModule
  ],
  exports: [DetailComponent],
  declarations: [DetailComponent]
})
export class DetailModule { }
