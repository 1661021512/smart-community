import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HouseComponent} from './house.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ValidatorClassModule} from '../../share/directive/validator-class/validator-class.module';
import {DemoModule} from '../../building/house/demo/demo.module';

/**
 * 生成住房
 */
@NgModule({
  declarations: [
    HouseComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ValidatorClassModule,
    DemoModule
  ],
  exports: [HouseComponent]
})
export class HouseModule {
}
