import {WebUserService} from '../../../../src/service/web-user.service';
import {User} from '../entity/user';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserApi} from "../api/user.api";
import {CacheNoticeService} from './cache-notice.service';

/**
 * 用于单元测试的测试桩
 * @author panjie
 */
@Injectable()
export class UserStubService extends WebUserService {

  constructor(httpClient: HttpClient,
              cacheNoticeService: CacheNoticeService) {
    super(httpClient, cacheNoticeService);
    this.currentLoginUserSubject.next(UserApi.currentLoginUser);
  }

  /**
   * 发送当前登录用户
   * @param user 用户
   */
  nextCurrentLoginUser(user: User): void {
    this.currentLoginUserSubject.next(user);
  }
}
