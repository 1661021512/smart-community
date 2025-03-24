import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from './add.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {ValidatorClassModule} from '../../../share/directive/validator-class/validator-class.module';

/**
 * 车辆类型新增
 */

@NgModule({
  declarations: [
    AddComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ValidatorClassModule
  ],
  exports: [
    AddComponent
  ]
})
export class AddModule { }
