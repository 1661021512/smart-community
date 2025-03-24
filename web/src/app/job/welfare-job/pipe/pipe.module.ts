import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {BirthdayAgePipe} from './birthday-age.pipe';
import { WelfarePostTypePipe } from './welfare-post-type.pipe'

/**
 * 公益性岗位-管道模块
 */
@NgModule({
  declarations: [
    BirthdayAgePipe,
    WelfarePostTypePipe,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    BirthdayAgePipe,
    WelfarePostTypePipe,
  ]
})
export class PipeModule {
}
