import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleTypeSelectComponent } from './vehicle-type-select.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {ReactiveFormsModule} from '@angular/forms';
import {Select2Module} from '../../../share/select2/select2.module';

/**
 * 车辆类型选择组件
 */

@NgModule({
  declarations: [
    VehicleTypeSelectComponent
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    ReactiveFormsModule,
    Select2Module
  ],
  exports: [
    VehicleTypeSelectComponent
  ]
})
export class VehicleTypeSelectModule { }
