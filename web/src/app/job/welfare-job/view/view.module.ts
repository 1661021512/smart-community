import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewComponent } from './view.component';
import {DateModule} from '../../../share/component/date/date.module'
import {PipeModule} from '../pipe/pipe.module'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {HttpClientModule} from '@angular/common/http'
import {WelfareJobShareModule} from '../welfare-job-share.module'
import {ValidatorClassModule} from '../../../share/directive/validator-class/validator-class.module'
import {ResidentPipeModule} from '../../../resident/pipe/resident-pipe.module'

/**
 * 公益性岗位管理详情
 */

@NgModule({
  declarations: [
    ViewComponent
  ],
  imports: [
    CommonModule,
    DateModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    WelfareJobShareModule
  ],
  exports: [
    ViewComponent
  ]
})
export class ViewModule { }
