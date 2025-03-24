import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ViewComponent} from './view.component';
import {ResidentViewModule} from '../../../resident/resident-view/resident-view.module';

/**
 * 网格员查看自己管理是的某个居民的信息
 */
@NgModule({
  declarations: [
    ViewComponent
  ],
  imports: [
    CommonModule,
    ResidentViewModule
  ],
  exports: [
    ViewComponent
  ]
})
export class ViewModule {
}
