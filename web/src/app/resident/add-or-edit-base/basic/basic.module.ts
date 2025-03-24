import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BasicComponent} from './basic.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TrueOrFalseModule} from '../../../share/component/true-or-false/true-or-false.module';
import {ValidatorClassModule} from '../../../share/directive/validator-class/validator-class.module';
import {ResidentShareModule} from '../../resident-share.module';
import {HouseChooseModule} from '../../house-choose/house-choose.module';
import {RelationshipShareModule} from '../../../system/relationship/relationship-share.module';
import {DateModule} from '../../../share/component/date/date.module';


@NgModule({
  declarations: [BasicComponent],
  imports: [
    CommonModule,
    TrueOrFalseModule,
    ReactiveFormsModule,
    ValidatorClassModule,
    ResidentShareModule,
    ReactiveFormsModule,
    TrueOrFalseModule,
    HouseChooseModule,
    FormsModule,
    RelationshipShareModule,
    DateModule,
  ], exports: [
    BasicComponent
  ]
})
export class BasicModule {
}
