import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditComponent } from './edit.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {ValidatorClassModule} from '../../../share/directive/validator-class/validator-class.module';

/**
 * 车辆类型编辑
 */

@NgModule({
  declarations: [
    EditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ValidatorClassModule
  ],
  exports: [
    EditComponent
  ]
})
export class EditModule { }
