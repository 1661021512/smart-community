import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IndexComponent} from './index.component';
import {NoticeIndexModule} from '../notice-index/notice-index.module';
import {IonicModule} from '@ionic/angular';

/**
 * 通知公告列表
 */
@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    NoticeIndexModule,
    IonicModule
  ]
})
export class IndexModule {
}
