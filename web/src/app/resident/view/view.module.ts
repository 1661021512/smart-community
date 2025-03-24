import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ViewComponent} from './view.component';
import {ResidentViewModule} from '../resident-view/resident-view.module';
import {ViewRoutingModule} from './view-routing.module';

/**
 * 查看居民详情
 */
@NgModule({
  declarations: [
    ViewComponent
  ],
  imports: [
    CommonModule,
    ResidentViewModule,
    ViewRoutingModule
  ]
})
export class ViewModule {
}
