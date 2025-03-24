import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VolunteerRoutingModule} from './volunteer-routing.module';
import {VolunteerComponent} from './volunteer.component';
import {ResidentShareModule} from "../resident/resident-share.module";
import {ReactiveFormsModule} from "@angular/forms";
import {ResidentPipeModule} from "../resident/pipe/resident-pipe.module";
import {PhoneShowModule} from "../resident/phone-show/phone-show.module";
import {HousePlacePipeModule} from "../resident/pipe/housePlace-pipe.module";
import {YzModalModule, YzPageModule, YzSizeModule} from "@yunzhi/ng-common";
import {EditOrSetWeightModule} from './edit-or-set-weight/edit-or-set-weight.module';
import {IntDateToTimestampModule} from '../../../projects/lib/src/lib/int-date-to-timestamp/int-date-to-timestamp.module';
import {ContentModule} from '../content/content.module';

/**
 * 志愿者管理
 */
@NgModule({
  declarations: [
    VolunteerComponent
  ],
  imports: [
    CommonModule,
    ContentModule,
    EditOrSetWeightModule,
    VolunteerRoutingModule,
    ResidentShareModule,
    ReactiveFormsModule,
    ResidentPipeModule,
    PhoneShowModule,
    HousePlacePipeModule,
    YzSizeModule,
    YzPageModule,
    IntDateToTimestampModule,
    YzModalModule
  ]
})
export class VolunteerModule {
}
