import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleColourSelectComponent } from './vehicle-colour-select.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {Select2Module} from '../../share/select2/select2.module';

/**
 * 车辆颜色选择组件
 */

@NgModule({
  declarations: [
    VehicleColourSelectComponent
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    ReactiveFormsModule,
    Select2Module
  ],
  exports: [
    VehicleColourSelectComponent
  ]
})
export class VehicleColourSelectModule { }
