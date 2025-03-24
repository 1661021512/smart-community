import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {VehicleRoutingModule} from './vehicle-routing.module';
import {IndexModule} from './index/index.module';
import {VehicleAddModule} from './vehicle-add/vehicle-add.module';
import {VehicleEditModule} from './vehicle-edit/vehicle-edit.module';
import {DetailModule} from "./detail/detail.module";


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    VehicleRoutingModule,
    IndexModule,
    VehicleAddModule,
    VehicleEditModule,
    DetailModule
  ]
})
export class VehicleModule { }
