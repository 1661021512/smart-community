import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HouseSelectComponent} from './house-select/house-select.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {Select2Module} from '../share/select2/select2.module';
import {HouseOwnTypeRadioComponent} from './house-own-type-radio/house-own-type-radio.component';
import {HouseOwnTypeRadioModule} from './house-own-type-radio/house-own-type-radio.module';
import {HouseTypeRadioModule} from './house-type-radio/house-type-radio.module';

/**
 * 房子
 */
@NgModule({
  declarations: [
    HouseSelectComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgSelectModule,
    Select2Module,
    HouseOwnTypeRadioModule,
    HouseTypeRadioModule
  ],
  exports: [
    HouseSelectComponent,
    HouseOwnTypeRadioComponent
  ]
})
export class HouseShareModule {
}
