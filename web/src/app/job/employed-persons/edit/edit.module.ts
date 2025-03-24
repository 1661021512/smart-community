import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditComponent} from './edit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DateModule} from 'src/app/share/component/date/date.module';
import {ValidatorClassModule} from "../../../share/directive/validator-class/validator-class.module";

/**
 * 招聘资讯管理,编辑
 */
@NgModule({
  declarations: [
    EditComponent
  ],
  imports: [
    CommonModule,

  ],
  exports: [
    EditComponent
  ]
})
export class EditModule {
}
