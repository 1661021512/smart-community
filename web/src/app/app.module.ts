import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {BasicModule} from '@yunzhi/ng-theme';
import {ThemeService} from '../../projects/lib/src/service/theme.service';
import {YzUploaderModule} from '@yunzhi/ng-common';
import {ApiProModule} from '../../projects/lib/src/api/api.pro.module';
import {NgxSpinnerModule} from 'ngx-spinner';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {AttachmentService} from '../../projects/lib/src/service/attachment.service';
import {ApiDemoModule} from '../../projects/lib/src/api/api.demo.module';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    RouterModule,
    BasicModule.forRoot({
      basicService: ThemeService
    }),
    AppRoutingModule,
    YzUploaderModule.forRoot({
      uploaderService: AttachmentService
    }),
    NgxSpinnerModule,
    NoopAnimationsModule,
    // 仅前台模式
    // ApiDemoModule,
    // 前后台模式
    ApiProModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
