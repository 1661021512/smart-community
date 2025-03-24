import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditComponent} from './edit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'
import {DateModule} from '../../../share/component/date/date.module'
import {WelfareJobShareModule} from '../welfare-job-share.module'
import {ValidatorClassModule} from '../../../share/directive/validator-class/validator-class.module';

/**
 * 就业服务-公益性岗位管理-编辑
 */
@NgModule({
  declarations: [
    EditComponent
  ],
  imports: [
    CommonModule,
    DateModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    WelfareJobShareModule,
    ValidatorClassModule
  ],
  exports: [
    EditComponent
  ]
})
export class EditModule {
}
