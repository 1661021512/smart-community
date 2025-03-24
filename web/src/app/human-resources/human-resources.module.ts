import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HumanResourcesRoutingModule} from './human-resources-routing.module';
import {ContentModule} from '../content/content.module';

/**
 * 人力资源公司
 */

@NgModule({
  imports: [
    CommonModule,
    ContentModule,
    HumanResourcesRoutingModule
  ]
})
export class HumanResourcesModule {
}
