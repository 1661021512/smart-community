import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index.component';
import { RouterModule } from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {YzPageModule, YzSizeModule} from '@yunzhi/ng-common';

/**
 * 车辆类型管理首页
 */

@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    YzPageModule,
    YzSizeModule,
  ],
  exports: [
    IndexComponent
  ]
})
export class IndexModule { }
