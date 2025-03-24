import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {VehicleBrandRoutingModule} from "./vehicle-brand-routing.module";
import {IndexModule} from "./index/index.module";
import {AddModule} from "./add/add.module";



@NgModule({
  declarations: [
  ],
  imports: [
    IndexModule,
    CommonModule,
    VehicleBrandRoutingModule,
    AddModule
  ]
})
export class VehicleBrandModule { }
