import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {IonicModule} from '@ionic/angular';
import {IndexModule} from './index/index.module';
import {HttpClientModule} from '@angular/common/http';
import {ApiDemoModule} from '../../../lib/src/api/api.demo.module';
import {ApiProModule} from '../api.pro.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    IndexModule,
    IonicModule.forRoot(),
    // 仅前台模式
    ApiProModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
