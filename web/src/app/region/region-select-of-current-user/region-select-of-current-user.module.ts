import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegionSelectOfCurrentUserComponent} from './region-select-of-current-user.component';
import {Select2Module} from '../../share/select2/select2.module';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [RegionSelectOfCurrentUserComponent],
  imports: [
    CommonModule,
    Select2Module,
    ReactiveFormsModule
  ], exports: [
    RegionSelectOfCurrentUserComponent
  ]
})
export class RegionSelectOfCurrentUserModule {
}
