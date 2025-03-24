import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RelationshipMapComponent} from './relationship-map.component';

/**
 * 人物关系图
 */
@NgModule({
  declarations: [
    RelationshipMapComponent
  ],
  imports: [
    CommonModule
  ], exports: [
    RelationshipMapComponent
  ]
})
export class RelationshipMapModule {
}
