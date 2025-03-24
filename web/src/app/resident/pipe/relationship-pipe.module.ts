import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RelationshipPipe} from './relationship.pipe';

/**
 * 居民间关系管道
 */
@NgModule({
  declarations: [RelationshipPipe],
  imports: [
    CommonModule
  ],
  exports: [
    RelationshipPipe
  ]
})
export class RelationshipPipeModule {
}
