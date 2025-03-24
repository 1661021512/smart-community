import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PropertyCompanyRoutingModule} from './property-company-routing.module';
import {AddModule} from "./add/add.module";
import {DetailModule} from './detail/detail.module';
import {IndexComponent} from "./index/index.component";
import {IndexModule} from "./index/index.module";
import {EditModule} from './edit/edit.module';

/**
 * 物业管理模块
 */
@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    PropertyCompanyRoutingModule,
    AddModule,
    DetailModule,
    IndexModule,
    EditModule
  ]
})

export class PropertyCompanyModule {
}
