import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContentComponent} from './content.component';
import {ContentDetailModule} from './concent-detail/content-detail.module';
import {ContentDetailComponent} from './concent-detail/content-detail.component';

/**
 * 内容模块
 */
@NgModule({
  declarations: [
    ContentComponent
  ],
  imports: [
    CommonModule,
    ContentDetailModule
  ],
  exports: [
    ContentDetailComponent
  ]
})
export class ContentModule {
}
