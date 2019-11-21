import {PreloadingStrategy, Route} from '@angular/router';
import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
/**
 * 预加载策略
 */
@Injectable()
export class SelectivePreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: Function): Observable<any> {
    // 当路由中配置data: {preload: true}时预加载
    return route.data && route.data['preload'] ? load() : of(null);
  }
}
