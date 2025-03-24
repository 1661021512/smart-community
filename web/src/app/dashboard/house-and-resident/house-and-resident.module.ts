import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HouseAndResidentComponent} from './house-and-resident.component';

/**
 * 子区域的居民与房屋信息柱状图
 */
@NgModule({
  declarations: [
    HouseAndResidentComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HouseAndResidentComponent
  ]
})
export class HouseAndResidentModule {
}
