import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {
  ApiPrefixAndMergeMapInterceptor, HttpErrorInterceptor, LoadingInterceptor,
  NullOrUndefinedOrEmptyInterceptor, Prevent401Popup,
  XAuthTokenInterceptor
} from '@yunzhi/ng-common';

@NgModule({
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ApiPrefixAndMergeMapInterceptor,
    multi: true
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: NullOrUndefinedOrEmptyInterceptor,
    multi: true
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: XAuthTokenInterceptor,
    multi: true
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: Prevent401Popup,
    multi: true
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptor,
    multi: true
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: LoadingInterceptor,
    multi: true
  }],
})
export class ApiProModule {
}
