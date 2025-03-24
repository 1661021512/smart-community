import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GriderHouseAddComponent} from './grider-house-add.component';
import {OwnedPipeModule} from '../../../../house/pipe.module';
import {YzPageModule, YzSizeModule} from '@yunzhi/ng-common';
import {HousePlacePipeModule} from '../../../../resident/pipe/housePlace-pipe.module';
import {PhoneShowModule} from '../../../../resident/phone-show/phone-show.module';
import {ReactiveFormsModule} from '@angular/forms';
import {RegionSelectOfCurrentUserModule} from '../../../../region/region-select-of-current-user/region-select-of-current-user.module';
import {BuildingShareModule} from '../../../../building/building-share.module';
import {BackModule} from '../../../../share/component/back/back.module';

/**
 * 给网格员添加住房
 */
@NgModule({
  declarations: [GriderHouseAddComponent],
  imports: [
    CommonModule,
    OwnedPipeModule,
    YzPageModule,
    YzSizeModule,
    HousePlacePipeModule,
    PhoneShowModule,
    ReactiveFormsModule,
    RegionSelectOfCurrentUserModule,
    BuildingShareModule,
    BackModule,
  ],
  exports: [
    GriderHouseAddComponent
  ]
})
export class GriderHouseAddModule {
}
