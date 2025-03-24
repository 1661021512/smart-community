import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index.component';
import {VillageShareModule} from '../../village/village-share.module';
import {ReactiveFormsModule} from '@angular/forms';
import {YzPageModule, YzSizeModule} from '@yunzhi/ng-common';
import {RouterModule} from '@angular/router';

/**
 * 排管理首页
 */
@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    VillageShareModule,
    ReactiveFormsModule,
    YzSizeModule,
    RouterModule,
    YzPageModule
  ],
  exports: [
    IndexComponent
  ]
})
export class IndexModule { }
