import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GriderRoutingModule} from './grider-routing.module';
import {IndexModule} from './index/index.module';
import {YzSizeModule} from '@yunzhi/ng-common';

/**
 * 网格员
 */
@NgModule({
  declarations: [],
  imports: [
    IndexModule,
    CommonModule,
    GriderRoutingModule,
    YzSizeModule
  ]
})
export class GriderModule {
}
