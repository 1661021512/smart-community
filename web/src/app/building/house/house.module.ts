import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HouseComponent} from './house.component';
import {DemoModule} from './demo/demo.module';
import {UnitsModule} from './units/units.module';
import {HouseRoutingModule} from './house-routing.module';
import {EditModule} from "./edit/edit.module";
import {ReactiveFormsModule} from "@angular/forms";
import {ValidatorClassModule} from '../../share/directive/validator-class/validator-class.module';

/**
 * 对楼房（排中）中的住房编号做统一管理
 * @author panjie
 */
@NgModule({
  declarations: [HouseComponent],
  imports: [
    CommonModule,
    DemoModule,
    UnitsModule,
    HouseRoutingModule,
    EditModule,
    ReactiveFormsModule,
    ValidatorClassModule
  ]
})
export class HouseModule {
}
