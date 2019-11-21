import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs/index';
import {Inject, Injectable} from '@angular/core';
import {catchError} from 'rxjs/internal/operators';
/**
 * Created by yaleizhu on 2019/2/28.
 * 自定义拦截器
 */

@Injectable()
export class CustomInterceptor implements HttpInterceptor {
  constructor() {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const url = this._config.localhost;
     req = req.clone({
     setHeaders: {
      Authorization: '123456'
     }
     /*url: url + req.url*/
     });

    return next.handle(req).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('请求错误：', error.error.message);
    } else {
      console.error(
        `错误代码： ${error.status}, ` +
        `错误体: ${error.error}`);
    }
    return throwError('请求错误！');
  }
}
