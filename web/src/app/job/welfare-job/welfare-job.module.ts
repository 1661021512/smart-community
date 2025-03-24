import {WelfareJobComponent} from './welfare-job.component';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {WelfareJobShareModule} from './welfare-job-share.module'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {DateModule} from '../../share/component/date/date.module'
import {YzPageModule, YzSizeModule} from '@yunzhi/ng-common'
import {WelfareJobRoutingModule} from "./welfare-job-routing.module";
import {ResidentPipeModule} from '../../resident/pipe/resident-pipe.module';
import {PipeModule} from './pipe/pipe.module';
import {EditModule} from './edit/edit.module';
import {AddModule} from './add/add.module';
import {ViewModule} from './view/view.module';

/**
 * 公益性岗位模块
 */
@NgModule({
  declarations: [
    WelfareJobComponent
  ],
  imports: [
    CommonModule,
    EditModule,
    AddModule,
    ViewModule,
    WelfareJobShareModule,
    FormsModule,
    DateModule,
    YzPageModule,
    YzSizeModule,
    ReactiveFormsModule,
    WelfareJobRoutingModule,
  ]
})
export class WelfareJobModule {}
