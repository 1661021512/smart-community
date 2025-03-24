import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HouseTypeRadioComponent} from './house-type-radio.component';
import {YzStatusRadioModule} from '../../share/yz-status/yz-status-radio/yz-status-radio.module';
import {ReactiveFormsModule} from '@angular/forms';

/**
 * 房屋类型(平房、楼房)选择组件
 */
@NgModule({
  declarations: [
    HouseTypeRadioComponent
  ],
  imports: [
    CommonModule,
    YzStatusRadioModule,
    ReactiveFormsModule
  ],
  exports: [HouseTypeRadioComponent]
})
export class HouseTypeRadioModule {
}
