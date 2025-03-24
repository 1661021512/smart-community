import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PartyRatioComponent} from './party-ratio.component';

/**
 * 党员占比
 */
@NgModule({
  declarations: [
    PartyRatioComponent
  ],
  exports: [
    PartyRatioComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PartyRatioModule {
}
