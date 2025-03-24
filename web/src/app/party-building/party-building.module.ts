import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddModule} from './add/add.module';
import {IndexModule} from './index/index.module';
import {PartyBuildingRoutingModule} from './party-building-routing.module';
import {EditModule} from './edit/edit.module';

/**
 * 党建管理
 */
@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    AddModule,
    EditModule,
    IndexModule,
    PartyBuildingRoutingModule,
  ]
})
export class PartyBuildingModule {
}
