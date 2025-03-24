import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddComponent} from './add.component';
import {VillageShareModule} from '../../village/village-share.module';
import {HouseShareModule} from '../house-share.module';
import {TrueOrFalseModule} from '../../share/component/true-or-false/true-or-false.module';
import {UnitShareModule} from '../unit-select/unit-share.module';
import {ReactiveFormsModule} from '@angular/forms';
import {DateModule} from '../../share/component/date/date.module';
import {BuildingShareModule} from '../../building/building-share.module';
import {ValidatorClassModule} from '../../share/directive/validator-class/validator-class.module';
import {HouseTypeRadioModule} from '../house-type-radio/house-type-radio.module';
import {BuildingTypeModule} from './building-type/building-type.module';
import {BungalowTypeModule} from './bungalow-type/bungalow-type.module';

@NgModule({
  declarations: [AddComponent],
  imports: [
    CommonModule,
    VillageShareModule,
    HouseShareModule,
    TrueOrFalseModule,
    UnitShareModule,
    ReactiveFormsModule,
    DateModule,
    ValidatorClassModule,
    BuildingShareModule,
    HouseTypeRadioModule,
    BuildingTypeModule,
    BungalowTypeModule
  ], exports: [
    AddComponent
  ]
})
export class AddModule {
}
