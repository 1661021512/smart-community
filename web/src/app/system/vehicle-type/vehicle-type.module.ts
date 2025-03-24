import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IndexModule} from './index/index.module';
import {VehicleTypeRoutingModule} from './vehicle-type-routing.module';
import {AddModule} from './add/add.module';
import {EditModule} from './edit/edit.module';

/**
 * 车辆类型管理
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    IndexModule,
    VehicleTypeRoutingModule,
    AddModule,
    EditModule
  ]
})
export class VehicleTypeModule {
}
