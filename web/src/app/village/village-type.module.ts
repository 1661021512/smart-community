import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VillageTypePipe} from './village-type.pipe';

/**
 * 小区类型
 */
@NgModule({
  declarations: [VillageTypePipe],
  imports: [
    CommonModule
  ],
  exports: [VillageTypePipe]
})
export class VillageTypeModule {
}
