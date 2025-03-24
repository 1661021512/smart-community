import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SecurityComponent} from './security.component';
import {TrueOrFalseModule} from '../../../share/component/true-or-false/true-or-false.module';
import {ReactiveFormsModule} from '@angular/forms';
import {ReligiousBeliefShareModule} from '../../../religious-belief/religious-belief-share.module';
import {CultShareModule} from '../../../cult/cult-share.module';


@NgModule({
  declarations: [SecurityComponent],
  imports: [
    CommonModule,
    TrueOrFalseModule,
    ReactiveFormsModule,
    ReligiousBeliefShareModule,
    CultShareModule
  ],
  exports: [SecurityComponent]
})
export class SecurityModule {
}
