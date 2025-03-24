import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UnitComponent} from './unit.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ValidatorClassModule} from '../../../../share/directive/validator-class/validator-class.module';


@NgModule({
  declarations: [
    UnitComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ValidatorClassModule
  ],
  exports: [UnitComponent]
})
export class UnitModule {
}
