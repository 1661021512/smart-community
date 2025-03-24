import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BuildingSelectComponent} from './building-select/building-select.component';
import {VillageShareModule} from "../village/village-share.module";
import {ReactiveFormsModule} from "@angular/forms";
import { BuildingTypePipe } from './building-type.pipe';

/**
 * 楼栋共享模块
 */
@NgModule({
  declarations: [
    BuildingSelectComponent
  ],
  imports: [
    CommonModule,
    VillageShareModule,
    ReactiveFormsModule
  ],
  exports: [
    BuildingSelectComponent
  ]
})
export class BuildingShareModule {
}
