import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {MockApiInterceptor} from '@yunzhi/ng-mock-api';
import {apis} from './apis';
import {LoadingInterceptor} from '@yunzhi/ng-common';

/**
 * 用于脱离后台跑demo
 */
@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS, multi: true, useClass: LoadingInterceptor
    },
    {
      provide: HTTP_INTERCEPTORS, multi: true, useClass: MockApiInterceptor.forRoot(apis)
    }]
})
export class ApiDemoModule {
}
