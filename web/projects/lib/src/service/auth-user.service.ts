import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {WechatUser} from '../entity/wechat-user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {User} from '../entity/user';

/**
 * 认证用户
 */
@Injectable({
  providedIn: 'root'
})
export class AuthUserService {
  currentLoginUser: User | WechatUser;
  private baseUrl = 'authUser';

  constructor(private httpClient: HttpClient) {
  }

  login(): Observable<WechatUser | User> {
    return this.httpClient.get<WechatUser>(this.baseUrl + '/login')
      .pipe(tap(data => {
        this.currentLoginUser = data;
      }));
  }

  /**
   * 通过TOKEN来登录
   * @param token TOKEN
   */
  loginByToken(token: string): Observable<WechatUser | User> {
    const httpHeader = new HttpHeaders().append('x-auth-token', token);
    return this.httpClient.get<WechatUser>(this.baseUrl + '/login', {headers: httpHeader})
      .pipe(tap(data => {
        this.currentLoginUser = data;
      }));
  }
}
