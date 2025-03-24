import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ActivityRoutingModule} from './activity-routing.module';

/**
 * 活动管理
 */
@NgModule({
  imports: [
    CommonModule,
    ActivityRoutingModule
  ]
})
export class ActivityModule {
}
