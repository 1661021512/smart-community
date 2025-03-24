import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddComponent} from './add.component';
import {ValidatorClassModule} from '../../share/directive/validator-class/validator-class.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RoleShareModule} from '../../system/role/role-share.module';
import {RegionSelectOfCurrentUserModule} from '../../region/region-select-of-current-user/region-select-of-current-user.module';
import {TrueOrFalseModule} from '../../share/component/true-or-false/true-or-false.module';
import {BuildingShareModule} from '../../building/building-share.module';


@NgModule({
  declarations: [AddComponent],
  imports: [
    CommonModule,
    ValidatorClassModule,
    ReactiveFormsModule,
    FormsModule,
    RegionSelectOfCurrentUserModule,
    RoleShareModule,
    TrueOrFalseModule,
    BuildingShareModule
  ],
  exports: [
    AddComponent
  ]
})
export class AddModule {
}
