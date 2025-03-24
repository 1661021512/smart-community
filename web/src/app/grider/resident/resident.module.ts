import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ResidentComponent} from './resident.component';
import {ResidentRoutingModule} from './resident-routing.module';
import {YzPageModule, YzSizeModule} from '@yunzhi/ng-common';
import {ReactiveFormsModule} from '@angular/forms';
import {RegionSelectOfCurrentUserModule} from '../../region/region-select-of-current-user/region-select-of-current-user.module';
import {ResidentShareModule} from '../../resident/resident-share.module';
import {ResidentPipeModule} from '../../resident/pipe/resident-pipe.module';
import {IdNumberShowModule} from '../../resident/id-number-show/id-number-show.module';
import {PhoneShowModule} from '../../resident/phone-show/phone-show.module';
import {HousePlacePipeModule} from '../../resident/pipe/housePlace-pipe.module';
import {ViewModule} from './view/view.module';
import {EditModule} from './edit/edit.module';

/**
 * 适用于网格员角色的居民管理
 * 即网格员管理自己的居民
 */
@NgModule({
  declarations: [ResidentComponent],
  imports: [
    CommonModule,
    ViewModule,
    EditModule,
    ResidentRoutingModule,
    YzSizeModule,
    YzPageModule,
    ReactiveFormsModule,
    ResidentShareModule,
    RegionSelectOfCurrentUserModule,
    ResidentPipeModule,
    IdNumberShowModule,
    PhoneShowModule,
    HousePlacePipeModule,
  ],
  exports: [
    ResidentComponent
  ]
})
export class ResidentModule {
}
