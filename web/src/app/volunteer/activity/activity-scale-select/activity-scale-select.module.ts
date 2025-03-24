import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ReactiveFormsModule} from '@angular/forms';
import {ActivityScaleSelectComponent} from './activity-scale-select.component';

/**
 *活动规模选择模块
 * Author zhangRui
 */
@NgModule({
  declarations:[
    ActivityScaleSelectComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports:[
    ActivityScaleSelectComponent
  ]
})
export class ActivityScaleSelectModule{}
