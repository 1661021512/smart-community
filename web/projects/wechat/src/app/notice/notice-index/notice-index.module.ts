import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NoticeIndexComponent} from './notice-index.component';
import {IonicModule} from '@ionic/angular';
import {ImageUrlModule} from '../../../../../lib/src/lib/image/image-url/image-url.module';
import {RouterModule} from '@angular/router';

/**
 * 通知公告首页
 */
@NgModule({
  declarations: [
    NoticeIndexComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ImageUrlModule,
    RouterModule
  ],
  exports: [NoticeIndexComponent]
})
export class NoticeIndexModule {
}
