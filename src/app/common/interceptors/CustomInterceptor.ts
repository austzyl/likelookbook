import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpResponseBase
} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs/index';
import {Inject, Injectable, Injector} from '@angular/core';
import {catchError, mergeMap} from 'rxjs/internal/operators';
import {SessionStorageService} from '../services/session-storage.service';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';

/**
 * Created by yaleizhu on 2019/2/28.
 * 自定义拦截器
 */

@Injectable()
export class CustomInterceptor implements HttpInterceptor {
  constructor(private sessionStorageService: SessionStorageService,
              private injector: Injector) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // // 统一加上服务端前缀
    // let url = req.url;
    // if (!url.startsWith('https://') && !url.startsWith('http://')) {
    //   url = environment.SERVER_URL + url;
    // }
    //
    // const newReq = req.clone({ url });
    let userId = '';
    if (this.sessionStorageService.getAuth('userId') != null) {
      userId = this.sessionStorageService.getAuth('userId');
    }
    req = req.clone({
      setHeaders: {
        Authorization: userId
      }
    });
    return next.handle(req).pipe(
      mergeMap((event: any) => {
        // 允许统一对请求错误处理
        if (event instanceof HttpResponseBase) {
          return this.handleData(event);
        }
        // 若一切都正常，则后续操作
        return of(event);
      }),
      catchError((err: HttpErrorResponse) => this.handleData(err)),
    );
  }

  /*
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      // const url = this._config.localhost;
      let userId = '';
      if (this.sessionStorageService.getAuth('userId') != null) {
        userId = this.sessionStorageService.getAuth('userId');
      }
      req = req.clone({
        setHeaders: {
          Authorization: userId
        }
        /!*url: url + req.url*!/
      });
      // return next.handle(req).pipe(catchError(this.handleError));

    }
  */


  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('请求错误：', error.error.message);
    } else {
      console.error(
        `错误代码： ${error.status}, ` +
        `错误体: ${error.error}`);
    }
    return throwError('请求错误！');
  }


   goTo(url: string) {
     setTimeout(() => this.injector.get(Router).navigateByUrl(url));
   }
  /*
     checkStatus(ev: HttpResponseBase) {
       if ((ev.status >= 200 && ev.status < 300) || ev.status === 401) {
         return;
       }
     }*/


  handleData(ev: HttpResponseBase): Observable<any> {

    // this.checkStatus(ev);
    // 业务处理：一些通用操作
    switch (ev.status
      ) {
      case
      200:
        // console.log('ev', ev);
        // console.log('this.injector.get(Router)', this.injector.get(Router));
        // 业务层级错误处理，以下是假定restful有一套统一输出格式（指不管成功与否都有相应的数据格式）情况下进行处理
        // 例如响应内容：
        //  错误内容：{ status: 1, msg: '非法参数' }
        //  正确内容：{ status: 0, response: {  } }
        // 则以下代码片断可直接适用
        if (ev instanceof HttpResponse) {
            const body: any = ev.body;
            if (body.auth === 'abcdefghijklmnpoqrdsuwvxyz') {
              this.sessionStorageService.clearAuth();
              if (this.injector.get(Router).url === '/shelf') {
                this.goTo('/user/login');
              }
            }
        }
        break;
      case
      401
      :
        // this.notification.error(`未登录或登录已过期，请重新登录。`, ``);
        // 清空 token 信息
        // this.goTo('/');
        break;
      case
      403
      :
      case
      404
      :
      case
      500
      :
      default:
        if (ev instanceof HttpErrorResponse) {
          console.warn('未可知错误，大部分是由于后端不支持CORS或无效配置引起', ev);
        }
        break;
    }
    if (ev instanceof HttpErrorResponse) {
      return throwError(ev);
    } else {
      return of(ev);
    }
  }


}

