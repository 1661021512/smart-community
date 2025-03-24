import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ResidentRoutingModule} from './resident-routing.module';
import {DetailComponent} from './detail/detail.component';
import {ParticularComponent} from './particular/particular.component';
import {RegionShareModule} from '../region/region-share.module';
import {ResidentShareModule} from './resident-share.module';
import {ReactiveFormsModule} from '@angular/forms';
import {YzPageModule, YzSizeModule} from '@yunzhi/ng-common';
import {ResidentPipeModule} from './pipe/resident-pipe.module';
import {RegionSelectOfCurrentUserModule} from '../region/region-select-of-current-user/region-select-of-current-user.module';
import {HousePlacePipeModule} from './pipe/housePlace-pipe.module';
import {EditModule} from './edit/edit.module';
import {IdNumberShowModule} from './id-number-show/id-number-show.module';
import {PhoneShowModule} from './phone-show/phone-show.module';
import {IndexModule} from './index/index.module';

/**
 * 居民管理
 */
@NgModule({
  declarations: [
    DetailComponent,
    ParticularComponent
  ],
  exports: [],
  imports: [
    EditModule,
    IndexModule,
    CommonModule,
    ResidentRoutingModule,
    RegionShareModule,
    ResidentShareModule,
    ReactiveFormsModule,
    YzSizeModule,
    YzPageModule,
    ResidentPipeModule,
    RegionSelectOfCurrentUserModule,
    HousePlacePipeModule,
    IdNumberShowModule,
    PhoneShowModule
  ]
})
export class ResidentModule {
}
