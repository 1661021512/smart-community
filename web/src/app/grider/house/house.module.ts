import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HouseRoutingModule} from './house-routing.module';
import {HouseComponent} from './house.component';
import {VillageShareModule} from '../../village/village-share.module';
import {BuildingShareModule} from '../../building/building-share.module';
import {UnitShareModule} from '../../house/unit-select/unit-share.module';
import {HouseOwnTypeRadioModule} from '../../house/house-own-type-radio/house-own-type-radio.module';
import {YzPageModule, YzSizeModule} from '@yunzhi/ng-common';
import {HousePlacePipeModule} from '../../resident/pipe/housePlace-pipe.module';
import {TrueOrFalseModule} from '../../share/true-or-false/true-or-false.module';
import {OwnedPipeModule} from '../../house/pipe.module';
import {ReactiveFormsModule} from '@angular/forms';
import {ViewModule} from './view/view.module';
import {EditModule} from './edit/edit.module';
import {AddResidentModule} from './add-resident/add-resident.module';


@NgModule({
  declarations: [
    HouseComponent
  ],
  imports: [
    CommonModule,
    ViewModule,
    EditModule,
    AddResidentModule,
    HouseRoutingModule,
    VillageShareModule,
    BuildingShareModule,
    UnitShareModule,
    HouseOwnTypeRadioModule,
    YzSizeModule,
    YzPageModule,
    HousePlacePipeModule,
    TrueOrFalseModule,
    OwnedPipeModule,
    ReactiveFormsModule
  ],
  exports: [
    HouseComponent
  ]
})
export class HouseModule {
}
