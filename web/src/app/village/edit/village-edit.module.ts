import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VillageEditComponent} from './village-edit.component';
import {CommunityShareModule} from '../../community/community-share.module';
import {Community3dShareModule} from '../../community3d/community3d-share.module';
import {TownShareModule} from '../../town/town-share.module';
import {ReactiveFormsModule} from '@angular/forms';
import {DateModule} from '../../share/component/date/date.module';
import {ValidatorClassModule} from "../../share/directive/validator-class/validator-class.module";

@NgModule({
  declarations: [VillageEditComponent],
  imports: [
    CommonModule,
    CommunityShareModule,
    Community3dShareModule,
    TownShareModule,
    ReactiveFormsModule,
    DateModule,
    ValidatorClassModule
  ], exports: [
    VillageEditComponent
  ]
})
export class VillageEditModule {
}
