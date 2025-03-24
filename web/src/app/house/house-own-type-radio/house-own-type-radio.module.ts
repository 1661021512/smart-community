import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HouseOwnTypeRadioComponent} from './house-own-type-radio.component';
import {OwnedPipeModule} from '../pipe.module';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [HouseOwnTypeRadioComponent],
  imports: [
    CommonModule,
    OwnedPipeModule,
    ReactiveFormsModule
  ], exports: [
    HouseOwnTypeRadioComponent
  ]
})
export class HouseOwnTypeRadioModule {
}
