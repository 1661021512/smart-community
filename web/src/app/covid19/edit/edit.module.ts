import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditComponent } from './edit.component';
import {TrueOrFalseModule} from '../../share/component/true-or-false/true-or-false.module';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    EditComponent
  ],
  imports: [
    CommonModule,
    TrueOrFalseModule,
    ReactiveFormsModule
  ],
  exports: [
    EditComponent
  ]
})
export class EditModule { }
