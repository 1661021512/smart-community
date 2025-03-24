import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddModule} from './add/add.module';
import {IndexModule} from './index/index.module';
import {BuildingBungalowRoutingModule} from './building-bungalow-routing.module';
import {HouseModule} from './house/house.module';
import {EditModule} from './edit/edit.module';

/**
 * 排管理
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AddModule,
    IndexModule,
    HouseModule,
    EditModule,
    BuildingBungalowRoutingModule
  ]
})
export class BuildingBungalowModule {
}
