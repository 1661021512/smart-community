import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HouseRoutingModule} from './house-routing.module';

import {VillageShareModule} from '../village/village-share.module';
import {BuildingShareModule} from '../building/building-share.module';
import {YzPageModule, YzSizeModule} from '@yunzhi/ng-common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UnitShareModule} from './unit-select/unit-share.module';
import {HouseShareModule} from './house-share.module';
import {AddModule} from './add/add.module';
import {EditModule} from './edit/edit.module';
import {IndexModule} from './index/index.module';
import {HousePlacePipeModule} from "../resident/pipe/housePlace-pipe.module";
import {TrueOrFalseModule} from "../share/true-or-false/true-or-false.module";
import {ResidentPipeModule} from "../resident/pipe/resident-pipe.module";
import {PhoneShowModule} from "../resident/phone-show/phone-show.module";
import {IdNumberShowModule} from "../resident/id-number-show/id-number-show.module";
import {RelationshipPipeModule} from "../resident/pipe/relationship-pipe.module";
import {OwnedPipeModule} from "./pipe.module";
import {DetailModule} from './detail/detail.module';

/**
 * 房屋管理
 */
@NgModule({
  imports: [
    CommonModule,
    DetailModule,
    HouseRoutingModule,
    VillageShareModule,
    BuildingShareModule,
    UnitShareModule,
    IndexModule,
    ReactiveFormsModule,
    YzPageModule,
    YzSizeModule,
    FormsModule,
    HouseShareModule,
    TrueOrFalseModule,
    ResidentPipeModule,
    AddModule,
    EditModule,
    HousePlacePipeModule,
    ResidentPipeModule,
    ResidentPipeModule,
    TrueOrFalseModule,
    ResidentPipeModule,
    ResidentPipeModule,
    PhoneShowModule,
    IdNumberShowModule,
    RelationshipPipeModule,
    OwnedPipeModule
  ]
})
export class HouseModule {
}
