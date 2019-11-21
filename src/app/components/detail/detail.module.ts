import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DetailComponent} from './detail.component';
import {RouterModule} from '@angular/router';
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
    RouterModule.forChild(ROUTES)
  ],
  exports: [DetailComponent],
  declarations: [DetailComponent]
})
export class DetailModule { }
