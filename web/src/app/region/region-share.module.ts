import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegionSelectOfCurrentUserModule} from './region-select-of-current-user/region-select-of-current-user.module';
import {RegionSelectOfCurrentUserComponent} from './region-select-of-current-user/region-select-of-current-user.component';

/**
 * 区域共享模块
 */
@NgModule({
  imports: [
    CommonModule,
    RegionSelectOfCurrentUserModule
  ],
  exports: [
    RegionSelectOfCurrentUserComponent
  ],
})
export class RegionShareModule {
}
