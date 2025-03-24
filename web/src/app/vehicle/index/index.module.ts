import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index.component';
import {YzPageModule, YzSizeModule} from '@yunzhi/ng-common';
import {ReactiveFormsModule} from '@angular/forms';
import {PipeModule} from '../pipe/pipe.module';
import {RouterModule} from '@angular/router';
import {VehicleTypeSelectModule} from '../../system/vehicle-type/vehicle-type-select/vehicle-type-select.module';
import {VillageShareModule} from '../../village/village-share.module';

/**
 * 车辆管理首页模块
 */

@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    YzPageModule,
    YzSizeModule,
    ReactiveFormsModule,
    PipeModule,
    RouterModule,
    VehicleTypeSelectModule,
    VillageShareModule,
  ],exports: [
    IndexComponent
  ]
})
export class IndexModule { }
