import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {ReactiveFormsModule} from '@angular/forms'
import {WelfareJobPostTypeSelectComponent} from './welfare-job-post-type-select.component'

/**
 * 公益性岗位类型选择模块
 * Author Wang Haodong
 */
@NgModule({
  declarations: [
    WelfareJobPostTypeSelectComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    WelfareJobPostTypeSelectComponent
  ]
})
export class WelfareJobPostTypeSelectModule {
}
