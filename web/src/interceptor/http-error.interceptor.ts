import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {CommonService} from '../../projects/lib/src/service/common.service';
import {WebUserService} from '../service/web-user.service';
import {environment} from '../environments/environment';

/**
 * HTTP请求错误拦截器.
 */
@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptor implements HttpInterceptor {
  public static DONT_INTERCEPT_HEADER_KEY = 'http-error-do-not-intercept';
  static commonService: CommonService;

  constructor(private commonService: CommonService,
              private userService: WebUserService) {
    HttpErrorInterceptor.commonService = commonService;
  }

  static showError(error: HttpErrorResponse, messagePrefix: string) {
    const description = error.url + ((error.error && typeof error.error.message !== 'undefined') ? ' -> ' + error.error.message : '');
    this.commonService.error(() => {
    }, description + '。请联系开发者(微信同号):' + environment.phone, error.status + messagePrefix);
  }

  /**
   * 处理异常
   * @param error 异常
   */
  private handleHttpException(error: HttpErrorResponse): Observable<HttpEvent<any>> {
    switch (error.status) {
      case 401:
        this.userService.setCurrentLoginUser(null);
        break;
      case 400:
        HttpErrorInterceptor.showError(error, '请求参数错误');
        break;
      case 403:
        HttpErrorInterceptor.showError(error, '您无此操作权限');
        break;
      case 404:
        HttpErrorInterceptor.showError(error, '资源未找到');
        break;
      case 405:
        HttpErrorInterceptor.showError(error, '方法不支持');
        break;
      case 500:
        HttpErrorInterceptor.showError(error, '服务器逻辑错误');
        break;
      case 502:
        HttpErrorInterceptor.showError(error, '服务器宕机');
        break;
      case 0:
        HttpErrorInterceptor.showError(error, '网络错误');
        break;
      default:
        HttpErrorInterceptor.showError(error, '未知错误。');
        break;
    }
    // 最终将异常抛出来，便于组件个性化处理
    return throwError(error);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if ('true' === req.headers.get(HttpErrorInterceptor.DONT_INTERCEPT_HEADER_KEY)) {
      return next.handle(req);
    } else {
      return next.handle(req).pipe(
        catchError((error: HttpErrorResponse) => {
          return this.handleHttpException(error);
        }));
    }
  }
}
