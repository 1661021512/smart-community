import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContentComponent} from './content.component';
import {ContentRoutingModule} from './content-routing.module';
import {ContentDetailModule} from './content-detail/content-detail.module';

/**
 * 内容管理模块
 */
@NgModule({
  declarations: [
    ContentComponent
  ],
  imports: [
    CommonModule,
    ContentRoutingModule,
    ContentDetailModule
  ]
})
export class ContentModule {
}
