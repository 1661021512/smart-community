import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DataEnterComponent} from './data-enter.component';

/**
 * 数据录入工作量
 */
@NgModule({
  declarations: [
    DataEnterComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DataEnterComponent
  ]
})
export class DataEnterModule {
}
