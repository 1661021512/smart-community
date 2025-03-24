import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleEditComponent } from './vehicle-edit.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ResidentShareModule} from '../../resident/resident-share.module';
import {
  VehicleBrandAutoCompleteModule
} from '../../system/vehicle-brand/vehicle-brand-auto-complete/vehicle-brand-auto-complete.module';
import {VehicleTypeSelectModule} from '../../system/vehicle-type/vehicle-type-select/vehicle-type-select.module';
import {VehicleColourSelectModule} from '../vehicle-colour-select/vehicle-colour-select.module';
import {YzStatusRadioModule} from '../../share/yz-status/yz-status-radio/yz-status-radio.module';
/**
 * 车辆编辑
 */

@NgModule({
  declarations: [
    VehicleEditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ResidentShareModule,
    VehicleBrandAutoCompleteModule,
    VehicleTypeSelectModule,
    VehicleColourSelectModule,
    YzStatusRadioModule
  ],
  exports: [
    VehicleEditComponent
  ]
})
export class VehicleEditModule { }
