import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StatusPipe} from './status.pipe';

/**
 * 发作的工作需求状态
 */
@NgModule({
  declarations: [
    StatusPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StatusPipe
  ]
})
export class StatusModule {
}
