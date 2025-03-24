import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WelcomeComponent} from './welcome.component';
import {HouseAndResidentModule} from '../house-and-resident/house-and-resident.module';
import {MapModule} from '../map/map.module';
import {CovidModule} from '../covid/covid.module';
import {PartyRatioModule} from '../party-ratio/party-ratio.module';
import {DataEnterModule} from '../data-enter/data-enter.module';
import {ReactiveFormsModule} from '@angular/forms';
import {CurrentUserDistrictModule} from '../../user/current-user-district/current-user-district.module';
import {RegionSelectOfCurrentUserModule} from '../../region/region-select-of-current-user/region-select-of-current-user.module';

/**
 * 欢迎页
 */
@NgModule({
  declarations: [
    WelcomeComponent
  ],
  imports: [
    CommonModule,
    HouseAndResidentModule,
    MapModule,
    CovidModule,
    PartyRatioModule,
    DataEnterModule,
    ReactiveFormsModule,
    CurrentUserDistrictModule,
    RegionSelectOfCurrentUserModule
  ],
  exports: [
    WelcomeComponent
  ]
})
export class WelcomeModule {
}
