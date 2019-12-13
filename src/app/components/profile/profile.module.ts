import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import {HomeComponent} from '../home/home.component';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {ButtonModule, GrowlModule, RatingModule} from 'primeng/primeng';
export const ROUTES = [
  {
    path: '',
    component: ProfileComponent
    // canActivate: [AuthenticatedGuard]
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    FormsModule,
    RatingModule,
    ButtonModule,
    GrowlModule
  ],
  declarations: [ProfileComponent]
})
export class ProfileModule { }
