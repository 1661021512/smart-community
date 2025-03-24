import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleColorPipe } from './vehicle-color.pipe';
import { VillagePipe } from './village.pipe';
import { ParkingSpaceTypePipe } from './parking-space-type.pipe';



@NgModule({
  declarations: [
    VehicleColorPipe,
    VillagePipe,
    ParkingSpaceTypePipe,
  ],
  exports: [
    VehicleColorPipe,
    VillagePipe,
    ParkingSpaceTypePipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipeModule { }
