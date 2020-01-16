import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ManagerGuard} from '../../common/interceptors/ManagerGuard';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {ContextMenuModule, FileUploadModule, GrowlModule, TreeTableModule} from 'primeng/primeng';
import {RouterModule} from '@angular/router';

export const ROUTES = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [ManagerGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    TreeTableModule,
    RouterModule.forChild(ROUTES),
    FileUploadModule,
    ReactiveFormsModule,
    GrowlModule,
  ],
  declarations: [
    LoginComponent,
    RegisterComponent
  ]
})
export class UserModule { }
