import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeComponent} from './components/home/home.component';
import {SelectivePreloadingStrategy} from './selective-preloading-strategy';

export const APPROUTES = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './components/home/home.module#HomeModule',
    data: {preload: true}
  },
  {
    path: 'detail/:id',
    loadChildren: './components/detail/detail.module#DetailModule',
    data: {preload: true}
  },
  {
    path: 'sys',
    loadChildren: './components/sys/sys.module#SysModule',
    data: {preload: true}
  }
  ];

@NgModule({
    imports: [
        RouterModule.forRoot(APPROUTES, {preloadingStrategy: SelectivePreloadingStrategy})
    ],
  exports: [RouterModule],
  providers: [SelectivePreloadingStrategy]
})
export class AppRoutingModule {}
