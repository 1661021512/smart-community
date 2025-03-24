import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IndexComponent} from './index.component';
import {VillageIndexModule} from '../../village/index/village-index.module';

/**
 * 片区首页
 */
@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    VillageIndexModule
  ],
  exports: [IndexComponent]
})
export class IndexModule {
}
