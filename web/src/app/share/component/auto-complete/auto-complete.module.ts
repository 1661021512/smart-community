import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AutoCompleteComponent} from './auto-complete.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';


@NgModule({
  declarations: [AutoCompleteComponent],
  imports: [
    CommonModule,
    AutocompleteLibModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [AutoCompleteComponent]
})
export class AutoCompleteModule {
}
