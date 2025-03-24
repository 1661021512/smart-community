import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddComponent} from './add.component';
import {CommunityShareModule} from '../../../community/community-share.module';
import {DateModule} from '../../../share/component/date/date.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ValidatorClassModule} from "../../../share/directive/validator-class/validator-class.module";
import {RegionSelectOfCurrentUserModule} from '../../../region/region-select-of-current-user/region-select-of-current-user.module';



@NgModule({
  declarations: [AddComponent],
  imports: [
    CommonModule,
    CommunityShareModule,
    DateModule,
    FormsModule,
    ReactiveFormsModule,
    ValidatorClassModule,
    RegionSelectOfCurrentUserModule
  ],exports: [
    AddComponent
  ]
})
export class AddModule { }
