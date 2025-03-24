import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MockApiTestingInterceptor} from '@yunzhi/ng-mock-api/testing';
import {CommonService} from '../service/common.service';
import {CommonStubService} from '../service/common.stub.service';
import {apis} from './apis';
import {WebUserService} from '../../../../src/service/web-user.service';
import {UserStubService} from '../service/user-stub.service';
import {AttachmentStubService} from '../service/attachment-stub.service';
import {AttachmentService} from '../service/attachment.service';

/**
 * 用于单元测试的ApiModule.
 */
@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    {provide: CommonService, useClass: CommonStubService},
    {provide: WebUserService, useClass: UserStubService},
    {provide: AttachmentService, useClass: AttachmentStubService},
    {
      provide: HTTP_INTERCEPTORS, multi: true, useClass: MockApiTestingInterceptor.forRoot(apis)
    }]
})
export class ApiTestingModule {
}
