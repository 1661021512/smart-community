import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MultiVillageSelectComponent} from './multi-village-select.component';
import {ReactiveFormsModule} from '@angular/forms';
import {VillageShareModule} from '../../village/village-share.module';

/**
 * 多选小区组件
 * #1514
 */

@NgModule({
  declarations: [
    MultiVillageSelectComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    VillageShareModule,
  ],
  exports: [
    MultiVillageSelectComponent
  ]
})
export class MultiVillageSelectModule { }
