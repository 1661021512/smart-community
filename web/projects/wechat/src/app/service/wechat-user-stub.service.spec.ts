import {TestBed} from '@angular/core/testing';
import {WechatUserStubService} from './wechat-user-stub.service';
import {RouterTestingModule} from '@yunzhi/ng-router-testing';
import {ApiTestingModule} from '../../../../lib/src/api/api.testing.module';

describe('WechatStubService', () => {
  let service: WechatUserStubService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ApiTestingModule
      ]
    });
    service = TestBed.inject(WechatUserStubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
