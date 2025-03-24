import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index.component';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {YzMaskModule, YzModalModule, YzPageModule, YzSizeModule} from '@yunzhi/ng-common';
import {RegionShareModule} from '../../region/region-share.module';
import {PhoneShowModule} from '../../resident/phone-show/phone-show.module';
import {ResidentPipeModule} from '../../resident/pipe/resident-pipe.module';
import {HousePlacePipeModule} from '../../resident/pipe/housePlace-pipe.module';
import {TrueOrFalseModule} from '../../share/true-or-false/true-or-false.module';
import {IdNumberShowModule} from '../../resident/id-number-show/id-number-show.module';
import {CheckAllModule} from '../../share/component/check-all/check-all.module';
import {CheckSingleModule} from '../../share/component/check-single/check-single.module';
import {EditModule} from '../edit/edit.module';


/**
 * 新冠专项
 */
@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    YzPageModule,
    RegionShareModule,
    YzSizeModule,
    PhoneShowModule,
    ResidentPipeModule,
    HousePlacePipeModule,
    TrueOrFalseModule,
    IdNumberShowModule,
    CheckAllModule,
    CheckSingleModule,
    YzMaskModule,
    YzModalModule,
    EditModule
  ],
  exports: [
    IndexComponent
  ]
})
export class IndexModule { }
