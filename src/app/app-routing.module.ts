import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {SelectivePreloadingStrategy} from './selective-preloading-strategy';
import {AuthenticatedGuard} from './common/interceptors/AuthenticatedGuard';
import {SessionStorageService} from './common/services/session-storage.service';
import {ManagerGuard} from './common/interceptors/ManagerGuard';

export const APPROUTES = [
  {
    path: '',
    redirectTo: 'root',
    pathMatch: 'full'
  },
  {
    path: 'root',
    loadChildren: './components/home/home.module#HomeModule',
    data: {preload: true}
  },
  {
    path: 'home',
    loadChildren: './components/home/home.module#HomeModule',
    data: {preload: true}
  },
  {
    path: 'category/:cateCode',
    loadChildren: './components/category/category.module#CategoryModule',
    data: {preload: true}
  },
  {
    path: 'shelf',
    loadChildren: './components/shelf/shelf.module#ShelfModule',
    data: {preload: true}
  },
  {
    path: 'detail/:bookDir/:id',
    loadChildren: './components/detail/detail.module#DetailModule',
    data: {preload: true}
  },
  {
    path: 'profile/:id',
    loadChildren: './components/profile/profile.module#ProfileModule',
    data: {preload: true}
  },
  {
    path: 'sys',
    loadChildren: './components/sys/sys.module#SysModule',
    data: {preload: true}
  },
  {
    path: 'user',
    loadChildren: './components/user/user.module#UserModule',
    data: {preload: true}
  }
  ];

@NgModule({
    imports: [
        RouterModule.forRoot(APPROUTES, {preloadingStrategy: SelectivePreloadingStrategy})
    ],
  exports: [RouterModule],
  providers: [SelectivePreloadingStrategy, AuthenticatedGuard, SessionStorageService, ManagerGuard]
})
export class AppRoutingModule {}
