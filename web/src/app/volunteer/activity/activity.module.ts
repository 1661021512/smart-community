import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivityComponent} from './activity.component';
import {ActivityRoutingModule} from './activity-routing.module';
import {AddModule} from './add/add.module';
import {ViewModule} from './view/view.module';
import {YzPageModule, YzSizeModule} from '@yunzhi/ng-common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DateModule} from '../../share/component/date/date.module';
import {PipeModule} from '../../../../projects/lib/src/lib/activity/pipe/pipe.module';
import {ActivityShareModule} from './activity-share.module';
import {IntDateToTimestampModule} from '../../../../projects/lib/src/lib/int-date-to-timestamp/int-date-to-timestamp.module';

/**
 * 志愿者活动
 */
@NgModule({
  declarations: [
    ActivityComponent,
  ],
  imports: [
    CommonModule,
    ActivityRoutingModule,
    AddModule,
    ViewModule,
    FormsModule,
    DateModule,
    ReactiveFormsModule,
    YzPageModule,
    YzSizeModule,
    PipeModule,
    ActivityShareModule,
    IntDateToTimestampModule
  ]
})
export class ActivityModule {
}
