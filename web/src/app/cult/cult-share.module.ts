import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CultAutoCompleteModule} from './cult-auto-comlete/cult-auto-complete.module';
import {CultAutoCompleteComponent} from './cult-auto-comlete/cult-auto-complete.component';

/**
 * 邪教组织
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CultAutoCompleteModule
  ],
  exports: [CultAutoCompleteComponent]
})
export class CultShareModule {
}
