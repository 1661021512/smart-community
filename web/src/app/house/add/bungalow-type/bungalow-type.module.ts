import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BungalowTypeComponent} from './bungalow-type.component';
import {BuildingTypeModule} from "../building-type/building-type.module";

/**
 * 平房
 */
@NgModule({
  declarations: [
    BungalowTypeComponent
  ],
  imports: [
    CommonModule,
    BuildingTypeModule
  ],
  exports: [BungalowTypeComponent]
})
export class BungalowTypeModule {
}
