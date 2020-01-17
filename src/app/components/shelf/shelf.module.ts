import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShelfComponent } from './shelf.component';
import {RouterModule} from '@angular/router';
import {NavModule} from '../shared/nav/nav.component';
import {GrowlModule} from 'primeng/growl';

export const ROUTES = [
  {
    path: '',
    component: ShelfComponent
    // canActivate: [AuthenticatedGuard]
  }
];
@NgModule({
  imports: [
    CommonModule,
    NavModule,
    RouterModule.forChild(ROUTES),
    GrowlModule
  ],
  declarations: [ShelfComponent]
})
export class ShelfModule { }
