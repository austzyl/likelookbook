import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuggestComponent } from './suggest.component';
import {RouterModule} from '@angular/router';
import {GrowlModule} from 'primeng/growl';
import {NavModule} from '../shared/nav/nav.component';
import {FormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';

export const ROUTES = [
  {
    path: '',
    component: SuggestComponent
    // canActivate: [AuthenticatedGuard]
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(ROUTES),
    GrowlModule,
    NavModule,
    ButtonModule

  ],
  declarations: [SuggestComponent]
})
export class SuggestModule { }
