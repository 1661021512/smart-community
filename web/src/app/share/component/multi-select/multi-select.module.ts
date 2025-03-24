import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MultiSelectComponent} from './multi-select.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {FormsModule} from '@angular/forms';

/**
 * 多选组件
 * https://stackblitz.com/run?file=src%2Fsearch-autocomplete-example.component.ts
 */
@NgModule({
  declarations: [
    MultiSelectComponent
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule
  ],
  exports: [
    MultiSelectComponent
  ]
})
export class MultiSelectModule {
}
