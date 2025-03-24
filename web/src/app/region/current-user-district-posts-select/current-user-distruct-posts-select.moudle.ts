import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Select2Module} from '../../share/select2/select2.module';
import {ReactiveFormsModule} from '@angular/forms';
import {CurrentUserDistrictPostsSelectComponent} from "./current-user-district-posts-select.component";

@NgModule({
  declarations: [CurrentUserDistrictPostsSelectComponent],
  imports: [
    CommonModule,
    Select2Module,
    ReactiveFormsModule
  ], exports: [
    CurrentUserDistrictPostsSelectComponent
  ]
})
export class RegionSelectOfCurrentUserModule {
}
