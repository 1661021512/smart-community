import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditComponent} from './edit.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RoleShareModule} from '../../system/role/role-share.module';
import {RegionShareModule} from '../../region/region-share.module';


@NgModule({
  declarations: [EditComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RoleShareModule,
    RegionShareModule
  ],
  exports: [EditComponent]
})
export class EditModule {
}
