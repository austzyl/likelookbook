import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CategoryComponent} from './category.component';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {ButtonModule, ContextMenuModule, DropdownModule, InputTextModule, RatingModule, TreeModule, TreeTableModule} from 'primeng/primeng';
import {ToastModule} from 'primeng/toast';
import {TableModule} from 'primeng/table';
import {NavModule} from '../shared/nav/nav.component';

export const ROUTES = [
  {
    path: '',
    component: CategoryComponent
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
    DropdownModule,
    TreeTableModule,
    ContextMenuModule,
    RouterModule.forChild(ROUTES),
    NavModule,
    RatingModule
  ],
  exports: [CategoryComponent],
  declarations: [
    CategoryComponent
  ]
})
export class CategoryModule { }
