import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuditRoutingModule} from './audit-routing.module';
import {AuditComponent} from './audit.component';
import {ResidentPipeModule} from '../../../resident/pipe/resident-pipe.module';
import {IntDateToTimestampModule} from '../../../../../projects/lib/src/lib/int-date-to-timestamp/int-date-to-timestamp.module';

/**
 * 审核志愿活动报名信息
 */
@NgModule({
  declarations: [
    AuditComponent
  ],
  imports: [
    CommonModule,
    AuditRoutingModule,
    ResidentPipeModule,
    IntDateToTimestampModule
  ]
})
export class AuditModule {
}
