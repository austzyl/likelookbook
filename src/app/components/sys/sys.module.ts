import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookManagerComponent} from './book-manager/book-manager.component';
import {CategoryManagerComponent} from './category-manager/category-manager.component';
import {UserComponent} from './user/user.component';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {TreeModule} from 'primeng/tree';
import {ToastModule} from 'primeng/toast';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {ContextMenuModule, DropdownModule, FileUploadModule, InputTextModule, TreeTableModule} from 'primeng/primeng';
import {AddEditCategoryComponent} from './category-manager/add-edit-category/add-edit-category.component';
import {AddEditBookComponent} from './book-manager/add-edit-book/add-edit-book.component';
import {ManagerGuard} from '../../common/interceptors/ManagerGuard';
import {NavModule} from '../shared/nav/nav.component';


export const ROUTES = [
  {
    path: '',
    component: BookManagerComponent,
    canActivate: [ManagerGuard]
  },
  {
    path: 'book',
    component: BookManagerComponent,
    canActivate: [ManagerGuard]
  },
  {
    path: 'category',
    component: CategoryManagerComponent,
    canActivate: [ManagerGuard]
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [ManagerGuard]
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
    DropdownModule,
    TreeTableModule,
    ContextMenuModule,
    RouterModule.forChild(ROUTES),
    FileUploadModule,
    NavModule
  ],
  declarations: [
    BookManagerComponent,
    CategoryManagerComponent,
    UserComponent,
    AddEditCategoryComponent,
    AddEditBookComponent
  ]
})
export class SysModule {
}
