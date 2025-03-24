import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HouseComponent} from './house.component';
import {YzPageModule, YzSizeModule} from '@yunzhi/ng-common';
import {HousePlacePipeModule} from '../../../resident/pipe/housePlace-pipe.module';
import {PhoneShowModule} from '../../../resident/phone-show/phone-show.module';
import {VillageShareModule} from '../../../village/village-share.module';
import {BuildingShareModule} from '../../../building/building-share.module';
import {OwnedPipeModule} from '../../../house/pipe.module';
import {GriderHouseAddModule} from './grider-house-add/grider-house-add.module';
import {CheckAllModule} from '../../../share/component/check-all/check-all.module';
import {CheckSingleModule} from '../../../share/component/check-single/check-single.module';
import {HouseRoutingModule} from './house-routing.module';

/**
 * 某个网格员的住房管理
 */
@NgModule({
  declarations: [HouseComponent],
  imports: [
    CommonModule,
    HouseRoutingModule,
    YzSizeModule,
    YzPageModule,
    HousePlacePipeModule,
    PhoneShowModule,
    VillageShareModule,
    BuildingShareModule,
    GriderHouseAddModule,
    OwnedPipeModule,
    CheckAllModule,
    CheckSingleModule,
  ],
  exports: [
    HouseComponent
  ]
})
export class HouseModule {
}
