import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NationalitySelectComponent} from './nationality-select.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from "@ng-select/ng-select";

@NgModule({
  declarations: [NationalitySelectComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormsModule
  ],
  exports: [NationalitySelectComponent]
})
export class NationalitySelectModule {
}
