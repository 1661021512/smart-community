import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaritalStatusSelectComponent} from './marital-status-select.component';
import {ReactiveFormsModule} from '@angular/forms';
import {YzStatusModule} from '../../share/yz-status/yz-status.module';


@NgModule({
  declarations: [MaritalStatusSelectComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    YzStatusModule
  ],
  exports: [MaritalStatusSelectComponent]
})
export class MaritalStatusSelectModule {
}
