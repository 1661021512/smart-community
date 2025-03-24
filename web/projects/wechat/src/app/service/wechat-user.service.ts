import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {CommonService} from './common.service';
import {WechatUser} from '../../../../lib/src/entity/wechat-user';
import {tap} from 'rxjs/operators';
import {AuthUserService} from '../../../../lib/src/service/auth-user.service';
import {HttpClient} from '@angular/common/http';


/**
 * 微信小程序官方文档
 * 写的是一如继往的差，只向钱看，的确是腾讯的风格
 * https://developers.weixin.qq.com/miniprogram/dev/component/web-view.html
 */
declare var wx: {
  miniProgram: {
    navigateTo: (data: {
      url: string
    }) => Promise<void>
  }
};

@Injectable({
  providedIn: 'root'
})
export class WechatUserService {
  init = false;
  private storageKey = 'lastAuthTime';
  private url = 'wechatUser';

  constructor(protected commonService: CommonService,
              protected httpClient: HttpClient,
              protected authService: AuthUserService) {
  }

  /**
   * 获取当前登录的微信用户
   */
  getCurrentWechatUser(): WechatUser {
    return this.authService.currentLoginUser as WechatUser;
  }

  /**
   * 更新当前微信用户的基本信息
   * @param wechatUser 微信用户
   */
  updateCurrentWechatUser(wechatUser: WechatUser): Observable<WechatUser> {
    return this.httpClient.put<WechatUser>(this.url + '/updateCurrentWechatUser', wechatUser)
      .pipe(tap(wechatUser => this.authService.currentLoginUser = wechatUser))
  }

  /**
   * 检测当前是否是小程序环境
   */
  checkIsWechatMiniProgramEnvironment(): Observable<boolean> {
    // @ts-ignore
    return of(window.__wxjs_environment === 'miniprogram');
  }

  goToWechatMiniProgramEnvironmentAuthPage(): void {
    const now = new Date();
    const lastAuthTime = sessionStorage.getItem(this.storageKey);
    if (lastAuthTime) {
      if (now.getTime() - (+lastAuthTime) < 60000) {
        this.commonService.error(() => {
        }, '您认证过于频繁，1分钟内仅能够发起1次认证');
      } else {
        wx.miniProgram.navigateTo({
          url: './../index/index'
        });
      }
    }
    sessionStorage.setItem(this.storageKey, now.getTime().toString());
  }
}
