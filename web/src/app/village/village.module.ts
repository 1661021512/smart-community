import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {VillageRoutingModule} from './village-routing.module';
import {YzPageModule, YzSizeModule} from '@yunzhi/ng-common';
import {VillageAddModule} from './add/village-add.module';
import {VillageEditModule} from './edit/village-edit.module';
import {VillageIndexModule} from './index/village-index.module';

/**
 * 小区管理
 */
@NgModule({
  declarations: [
  ],
  imports: [
    VillageAddModule,
    VillageIndexModule,
    VillageEditModule,
    CommonModule,
    ReactiveFormsModule,
    VillageRoutingModule,
    YzSizeModule,
    YzPageModule
  ]
})
export class VillageModule {
}
