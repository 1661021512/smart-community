import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ResidentAddComponent} from './resident-add.component';
import {ChooseHouseModule} from '../add-or-edit-base/choose-house/choose-house.module';
import {ResidentShareModule} from '../resident-share.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TrueOrFalseModule} from '../../share/component/true-or-false/true-or-false.module';
import {SoldierModule} from '../add-or-edit-base/soldier/soldier.module';
import {StudentModule} from '../add-or-edit-base/student/student.module';
import {SecurityModule} from '../add-or-edit-base/security/security.module';
import {BasicModule} from '../add-or-edit-base/basic/basic.module';
import {AgedModule} from '../add-or-edit-base/aged/aged.module';
import {JobModule} from '../add-or-edit-base/job/job.module';
import {ValidatorClassModule} from '../../share/directive/validator-class/validator-class.module';
import {VillageShareModule} from '../../village/village-share.module';
import {HouseShareModule} from '../../house/house-share.module';
import {BuildingShareModule} from '../../building/building-share.module';
import {DateModule} from '../../share/component/date/date.module';
import {ResidentPipeModule} from '../pipe/resident-pipe.module';
import {HousePlacePipeModule} from '../pipe/housePlace-pipe.module';
import {RelationshipPipeModule} from '../pipe/relationship-pipe.module';

/**
 * 新增居民
 */
@NgModule({
  declarations: [ResidentAddComponent],
  imports: [
    CommonModule,
    ChooseHouseModule,
    ResidentShareModule,
    ReactiveFormsModule,
    TrueOrFalseModule,
    SoldierModule,
    StudentModule,
    SecurityModule,
    BasicModule,
    AgedModule,
    JobModule,
    ValidatorClassModule,
    VillageShareModule,
    HouseShareModule,
    BuildingShareModule,
    FormsModule,
    DateModule,
    ResidentPipeModule,
    HousePlacePipeModule,
    RelationshipPipeModule
  ],
  exports: [
    ResidentAddComponent
  ]
})
export class ResidentAddModule {
}
