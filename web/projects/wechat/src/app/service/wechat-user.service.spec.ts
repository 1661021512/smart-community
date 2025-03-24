import {TestBed} from '@angular/core/testing';

import {WechatUserService} from './wechat-user.service';
import {RouterTestingModule} from '@yunzhi/ng-router-testing';
import {ApiTestingModule} from '../../../../lib/src/api/api.testing.module';

describe('WechatUserService', () => {
  let service: WechatUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ApiTestingModule
      ]
    });
    service = TestBed.inject(WechatUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
