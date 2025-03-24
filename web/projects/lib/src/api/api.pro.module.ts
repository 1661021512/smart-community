import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {ApiPrefixAndMergeMapInterceptor} from '../../../../src/interceptor/api-prefix-and-merge-map.interceptor';
import {NullOrUndefinedOrEmptyInterceptor} from '../../../../src/interceptor/null-or-undefined-or-empty.interceptor';
import {XAuthTokenInterceptor} from '../../../../src/interceptor/x-auth-token.interceptor';
import {HttpErrorInterceptor} from '../../../../src/interceptor/http-error.interceptor';
import {Prevent401Popup} from '../../../../src/interceptor/prevent-401-popup';
import {LoadingInterceptor} from "../../../../src/interceptor/loading.interceptor";

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
