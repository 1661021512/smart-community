import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IndexModule} from './index/index.module';
import {VillageBungalowRoutingModule} from './village-bungalow-routing.module';
import {AddModule} from './add/add.module';
import {EditModule} from './edit/edit.module';

/**
 * 片区管理
 * 片区管理等于同小区管理
 * 唯一不同的是：
 * 小区管理管理的是楼房
 * 而片区管理管理的是平房
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    IndexModule,
    EditModule,
    AddModule,
    VillageBungalowRoutingModule
  ]
})
export class VillageBungalowModule {
}
