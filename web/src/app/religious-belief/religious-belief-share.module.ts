import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReligiousBeliefAutoCompleteComponent} from './religious-belief-auto-complete/religious-belief-auto-complete.component';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AutoCompleteModule} from '../share/component/auto-complete/auto-complete.module';

/**
 * 宗教信仰
 */
@NgModule({
  declarations: [ReligiousBeliefAutoCompleteComponent],
  imports: [
    CommonModule,
    AutocompleteLibModule,
    ReactiveFormsModule,
    FormsModule,
    AutoCompleteModule
  ],
  exports: [ReligiousBeliefAutoCompleteComponent]
})
export class ReligiousBeliefShareModule {
}
