import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BuildingTypeComponent} from './building-type.component';
import {VillageShareModule} from '../../../village/village-share.module';
import {HouseShareModule} from '../../house-share.module';
import {TrueOrFalseModule} from '../../../share/component/true-or-false/true-or-false.module';
import {UnitShareModule} from '../../unit-select/unit-share.module';
import {ReactiveFormsModule} from '@angular/forms';
import {DateModule} from '../../../share/component/date/date.module';
import {ValidatorClassModule} from '../../../share/directive/validator-class/validator-class.module';
import {BuildingShareModule} from '../../../building/building-share.module';
import {YzModalModule} from "@yunzhi/ng-common";

/**
 * 楼房
 */
@NgModule({
  declarations: [
    BuildingTypeComponent
  ],
  imports: [
    CommonModule,
    CommonModule,
    VillageShareModule,
    HouseShareModule,
    TrueOrFalseModule,
    UnitShareModule,
    ReactiveFormsModule,
    DateModule,
    ValidatorClassModule,
    BuildingShareModule,
    YzModalModule
  ],
  exports: [BuildingTypeComponent]
})
export class BuildingTypeModule {
}
