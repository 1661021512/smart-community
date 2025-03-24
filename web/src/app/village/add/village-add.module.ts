import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VillageAddComponent} from './village-add.component';
import {CommunityShareModule} from '../../community/community-share.module';
import {Community3dShareModule} from '../../community3d/community3d-share.module';
import {TownShareModule} from '../../town/town-share.module';
import {DateModule} from '../../share/component/date/date.module';
import {ReactiveFormsModule} from '@angular/forms';
import {ValidatorClassModule} from "../../share/directive/validator-class/validator-class.module";
import {UploaderModule} from '../../attachment/uploader/uploader.module';



@NgModule({
  declarations: [VillageAddComponent],
  imports: [
    CommonModule,
    CommunityShareModule,
    Community3dShareModule,
    TownShareModule,
    DateModule,
    ReactiveFormsModule,
    ValidatorClassModule,
    UploaderModule
  ],exports: [
    VillageAddComponent
  ]
})
export class VillageAddModule { }
