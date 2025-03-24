import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ReactiveFormsModule} from '@angular/forms';
import {UnitSelectComponent} from './unit-select.component';
import {BuildingShareModule} from '../../building/building-share.module';

/**
 * 单元共享模块
 * Author zhangrui
 */
@NgModule({
  declarations: [
    UnitSelectComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BuildingShareModule
  ],
  exports: [
    UnitSelectComponent
  ]
})
export class UnitShareModule {
}
