import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookManagerComponent} from './book-manager/book-manager.component';
import {CategoryManagerComponent} from './category-manager/category-manager.component';
import {RegisterComponent} from './register/register.component';
import {UserComponent} from './user/user.component';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {TreeModule} from 'primeng/tree';
import {ToastModule} from 'primeng/toast';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/primeng';
import { AddEditCategoryComponent } from './category-manager/add-edit-category/add-edit-category.component';


export const ROUTES = [
  {
    path: '',
    component: BookManagerComponent
    // canActivate: [AuthenticatedGuard]
  },
  {
    path: 'book',
    component: BookManagerComponent
    // canActivate: [AuthenticatedGuard]
  },
  {
    path: 'category',
    component: CategoryManagerComponent
    // canActivate: [AuthenticatedGuard]
  },
  {
    path: 'register',
    component: RegisterComponent
    // canActivate: [AuthenticatedGuard]
  },
  {
    path: 'user',
    component: UserComponent
    // canActivate: [AuthenticatedGuard]
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TreeModule,
    ToastModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [BookManagerComponent, CategoryManagerComponent, RegisterComponent, UserComponent, AddEditCategoryComponent]
})
export class SysModule { }
