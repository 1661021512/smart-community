import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EnterpriseAutoCompleteComponent} from './enterprise-auto-complete/enterprise-auto-complete.component';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AutoCompleteModule} from '../share/component/auto-complete/auto-complete.module';

/**
 * 企事业单位
 */
@NgModule({
  declarations: [
    EnterpriseAutoCompleteComponent
  ],
  imports: [
    CommonModule,
    AutocompleteLibModule,
    ReactiveFormsModule,
    FormsModule,
    AutoCompleteModule
  ],
  exports: [
    EnterpriseAutoCompleteComponent
  ]
})
export class EnterpriseShareModule {
}
