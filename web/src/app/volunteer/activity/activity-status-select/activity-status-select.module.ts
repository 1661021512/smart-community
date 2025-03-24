import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ReactiveFormsModule} from '@angular/forms';
import {ActivityStatusSelectComponent} from './activity-status-select.component';

/**
 *活动状态选择模块
 * Author zhangRui
 */
@NgModule({
  declarations:[
    ActivityStatusSelectComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports:[
    ActivityStatusSelectComponent
  ]
})
export class ActivityStatusSelectModule{}
