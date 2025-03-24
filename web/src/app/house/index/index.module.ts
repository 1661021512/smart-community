import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IndexComponent} from './index.component';
import {VillageShareModule} from '../../village/village-share.module';
import {BuildingShareModule} from '../../building/building-share.module';
import {ReactiveFormsModule} from '@angular/forms';
import {YzPageModule, YzSizeModule} from '@yunzhi/ng-common';
import {RouterModule} from '@angular/router';
import {HouseOwnTypeRadioModule} from '../house-own-type-radio/house-own-type-radio.module';
import {UnitShareModule} from '../unit-select/unit-share.module';
import {OwnedPipeModule} from '../pipe.module';
import {HousePlacePipeModule} from "../../resident/pipe/housePlace-pipe.module";
import {TrueOrFalseModule} from "../../share/true-or-false/true-or-false.module";

/**
 * 住房列表
 */
@NgModule({
  declarations: [IndexComponent],
    imports: [
        CommonModule,
        VillageShareModule,
        BuildingShareModule,
        ReactiveFormsModule,
        RouterModule,
        YzPageModule,
        YzSizeModule,
      OwnedPipeModule,
        HouseOwnTypeRadioModule,
        UnitShareModule,
        HousePlacePipeModule,
        TrueOrFalseModule
    ],
  exports: [
    IndexComponent
  ]
})
export class IndexModule {
}
