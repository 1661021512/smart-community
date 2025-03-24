import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {PipeModule} from '../../../../projects/lib/src/lib/activity/pipe/pipe.module';
import {ActivityScaleSelectComponent} from './activity-scale-select/activity-scale-select.component';
import {ActivityScaleSelectModule} from './activity-scale-select/activity-scale-select.module';
import {ActivityStatusSelectModule} from './activity-status-select/activity-status-select.module';
import {ActivityStatusSelectComponent} from './activity-status-select/activity-status-select.component';

/**
 * 志愿者活动
 */
@NgModule({
  declarations:[],
  imports:[
    CommonModule,
    ReactiveFormsModule,
    PipeModule,
    ActivityScaleSelectModule,
    ActivityStatusSelectModule
  ],
  exports: [
    ActivityScaleSelectComponent,
    ActivityStatusSelectComponent
  ]
})
export class ActivityShareModule{}
