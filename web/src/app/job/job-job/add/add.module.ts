import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from './add.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DateModule} from "../../../share/component/date/date.module";
import {EditorModule} from '../../../editor/editor.module';

/**
 * 招聘资讯管理,新增
 */

@NgModule({
  declarations: [
    AddComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DateModule,
    EditorModule
  ],
  exports: [
    AddComponent
  ]
})
export class AddModule { }
