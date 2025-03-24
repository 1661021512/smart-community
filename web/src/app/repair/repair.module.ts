import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RepairRoutingModule} from './repair-routing.module';
import {IndexComponent} from './index/index.component';
import { ViewComponent } from './view/view.component';

/**
 * 报修管理
 */
@NgModule({
  declarations: [
    IndexComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    RepairRoutingModule
  ]
})
export class RepairModule {
}
