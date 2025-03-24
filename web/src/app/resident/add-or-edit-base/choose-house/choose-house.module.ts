import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChooseHouseComponent} from './choose-house.component';
import {VillageShareModule} from '../../../village/village-share.module';
import {BuildingShareModule} from '../../../building/building-share.module';
import {HouseShareModule} from '../../../house/house-share.module';
import {TrueOrFalseModule} from '../../../share/component/true-or-false/true-or-false.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DateModule} from '../../../share/component/date/date.module';
import {ResidentPipeModule} from '../../pipe/resident-pipe.module';
import {RouterModule} from '@angular/router';
import {RelationshipPipeModule} from '../../pipe/relationship-pipe.module';
import {IdNumberShowModule} from '../../id-number-show/id-number-show.module';
import {PhoneShowModule} from '../../phone-show/phone-show.module';



@NgModule({
  declarations: [ChooseHouseComponent],
  imports: [
    CommonModule,
    VillageShareModule,
    BuildingShareModule,
    HouseShareModule,
    TrueOrFalseModule,
    ReactiveFormsModule,
    FormsModule,
    DateModule,
    ResidentPipeModule,
    RouterModule,
    RelationshipPipeModule,
    IdNumberShowModule,
    PhoneShowModule
  ],
  exports: [ChooseHouseComponent]
})
export class ChooseHouseModule { }
