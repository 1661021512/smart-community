import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ScheduledComponent} from './scheduled.component';
import {ScheduledRoutingModule} from './scheduled-routing.module';

/**
 * 调度
 * 用于临时手动触发后台的自动调度方法
 */
@NgModule({
  declarations: [
    ScheduledComponent
  ],
  imports: [
    CommonModule,
    ScheduledRoutingModule
  ]
})
export class ScheduledModule {
}
