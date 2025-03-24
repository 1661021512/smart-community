import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VehicleBrandAutoCompleteComponent} from './vehicle-brand-auto-complete.component';
import {AutoCompleteModule} from "../../../share/component/auto-complete/auto-complete.module";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    VehicleBrandAutoCompleteComponent
  ],
  imports: [
    CommonModule,
    AutoCompleteModule,
    ReactiveFormsModule
  ],
  exports: [
    VehicleBrandAutoCompleteComponent
  ]
})
export class VehicleBrandAutoCompleteModule {
}
