import {Injectable} from '@angular/core';
import {WechatUserService} from './wechat-user.service';
import {Observable, of} from 'rxjs';
import {CommonService} from './common.service';
import {HttpClient} from '@angular/common/http';
import {AuthUserService} from '../../../../lib/src/service/auth-user.service';

@Injectable({
  providedIn: 'root'
})
export class WechatUserStubService extends WechatUserService {


  constructor(protected commonService: CommonService,
              protected httpClient: HttpClient,
              protected authService: AuthUserService) {
    super(commonService, httpClient, authService);
  }

  /**
   * 检测当前是否是小程序环境
   */
  checkIsWechatMiniProgramEnvironment(): Observable<boolean> {
    return of(true);
  }

  goToWechatMiniProgramEnvironmentAuthPage(): void {
    console.warn('当前程序正在尝试向微信小程序端跳转');
  }
}
