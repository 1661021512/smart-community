import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {PipeModule} from './pipe/pipe.module'
import {WelfareJobPostTypeSelectModule} from './welfare-job-post-type-select/welfare-job-post-type-select.module'
import {WelfareJobPostTypeSelectComponent} from './welfare-job-post-type-select/welfare-job-post-type-select.component'
import {ResidentPipeModule} from '../../resident/pipe/resident-pipe.module'
import {BirthdayAgePipe} from './pipe/birthday-age.pipe'
import {WelfarePostTypePipe} from './pipe/welfare-post-type.pipe'
import {SexPipe} from '../../resident/pipe/sex.pipe'


/**
 * 公益性岗位-share模块
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PipeModule,
    WelfareJobPostTypeSelectModule,
    ResidentPipeModule
  ],
  exports: [
    WelfareJobPostTypeSelectComponent,
    BirthdayAgePipe,
    WelfarePostTypePipe,
    SexPipe
  ]
})
export class WelfareJobShareModule {
}
