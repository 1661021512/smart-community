import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivityDetailsComponent} from './activity-details.component';
import {IonicModule} from '@ionic/angular';
import {IntDateToTimestampModule} from '../../../../../lib/src/lib/int-date-to-timestamp/int-date-to-timestamp.module';
import {SafeModule} from '../../../../../../src/app/share/pipe/safe/safe.module';
import {ActivityDetailsRoutingModule} from './activity-details-routing.module';

/**
 * 活动详情
 */
@NgModule({
  declarations: [
    ActivityDetailsComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    IntDateToTimestampModule,
    SafeModule,
    ActivityDetailsRoutingModule
  ],
  exports: [
    ActivityDetailsComponent
  ]
})
export class ActivityDetailsModule {
}
