import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MyPartyBuildingRoutingModule} from './my-party-building-routing.module';
import {MyPartyBuildingComponent} from './my-party-building.component';


@NgModule({
  declarations: [MyPartyBuildingComponent],
  imports: [
    CommonModule,
    MyPartyBuildingRoutingModule
  ]
})
export class MyPartyBuildingModule {
}
