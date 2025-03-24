import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IntDateToTimestampPipe} from './int-date-to-timestamp.pipe';

/**
 * int类型的日期转换为时间戳
 */
@NgModule({
  declarations: [IntDateToTimestampPipe],
  imports: [
    CommonModule
  ], exports: [
    IntDateToTimestampPipe
  ]
})
export class IntDateToTimestampModule {
}
