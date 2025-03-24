import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ThreeModelRoutingModule} from './three-model-routing.module';
import {ThreeComponent} from './index/three.component';
import {ThreeModelShareModule} from './three-model-share.module';


@NgModule({
  declarations: [
    ThreeComponent
  ],
  imports: [
    CommonModule,
    ThreeModelShareModule,
    ThreeModelRoutingModule
  ],
  exports: []
})
export class ThreeModelModule {
}
