import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditComponent} from './edit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DateModule} from '../../../share/component/date/date.module';
import {EditorModule} from '../../../editor/editor.module';

/**
 * 新增招聘信息
 */
@NgModule({
  declarations: [
    EditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DateModule,
    EditorModule
  ],
  exports: [
    EditComponent
  ]
})
export class EditModule {
}
