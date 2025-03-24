import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HouseChooseComponent} from './house-choose.component';
import {VillageShareModule} from '../../village/village-share.module';
import {BuildingShareModule} from '../../building/building-share.module';
import {HouseShareModule} from '../../house/house-share.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    HouseChooseComponent
  ],
  imports: [
    CommonModule,
    VillageShareModule,
    BuildingShareModule,
    HouseShareModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    HouseChooseComponent
  ]
})
export class HouseChooseModule {
}
