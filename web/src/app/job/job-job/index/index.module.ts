
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index.component';
import {YzPageModule, YzSizeModule} from '@yunzhi/ng-common';
import {RouterModule} from "@angular/router";
import {StatusModule} from '../status/status.module';

/**
 * 招聘资讯管理分页查询
 */

@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    YzPageModule,
    YzSizeModule,
    RouterModule,
    StatusModule
  ],
  exports: [
    IndexComponent
  ]
})
export class IndexModule { }
