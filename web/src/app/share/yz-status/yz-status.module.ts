import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {YzStatusSelectComponent} from './yz-status-select.component';
import {ReactiveFormsModule} from '@angular/forms';
import {YzStatusRadioModule} from './yz-status-radio/yz-status-radio.module';
import {YzStatusRadioComponent} from './yz-status-radio/yz-status-radio.component';

/**
 * 状态相关模块
 * 解决多状态时定制格式输出的问题
 */
@NgModule({
  declarations: [
    YzStatusSelectComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    YzStatusRadioModule
  ],
  exports: [
    YzStatusSelectComponent,
    YzStatusRadioComponent
  ]
})
export class YzStatusModule {
}
