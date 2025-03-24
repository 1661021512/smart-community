import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {ValidatorClassModule} from '../../share/directive/validator-class/validator-class.module';
import {DateModule} from '../../share/component/date/date.module';
import {VillageShareModule} from '../../village/village-share.module';
import {BuildingShareModule} from '../../building/building-share.module';
import {UnitShareModule} from '../unit-select/unit-share.module';
import {HouseOwnTypeRadioModule} from '../house-own-type-radio/house-own-type-radio.module';
import {TrueOrFalseModule} from '../../share/component/true-or-false/true-or-false.module';
import {HouseEditComponent} from './house-edit.component';


@NgModule({
  declarations: [HouseEditComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ValidatorClassModule,
    DateModule,
    VillageShareModule,
    BuildingShareModule,
    UnitShareModule,
    HouseOwnTypeRadioModule,
    TrueOrFalseModule
  ],
  exports: [HouseEditComponent]
})
export class HouseEditModule {
}
