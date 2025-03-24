import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HouseDetailComponent} from './house-detail.component';
import {IdNumberShowModule} from '../../resident/id-number-show/id-number-show.module';
import {PhoneShowModule} from '../../resident/phone-show/phone-show.module';
import {ResidentShareModule} from '../../resident/resident-share.module';
import {ResidentPipeModule} from '../../resident/pipe/resident-pipe.module';
import {RelationshipPipeModule} from '../../resident/pipe/relationship-pipe.module';
import {TrueOrFalseModule} from '../../share/true-or-false/true-or-false.module';
import {OwnedPipeModule} from '../pipe.module';
import {BackModule} from '../../share/component/back/back.module';

@NgModule({
  declarations: [HouseDetailComponent],
  imports: [
    CommonModule,
    IdNumberShowModule,
    PhoneShowModule,
    ResidentShareModule,
    ResidentPipeModule,
    RelationshipPipeModule,
    TrueOrFalseModule,
    OwnedPipeModule,
    BackModule
  ],
  exports: [HouseDetailComponent]
})
export class HouseDetailModule {
}
