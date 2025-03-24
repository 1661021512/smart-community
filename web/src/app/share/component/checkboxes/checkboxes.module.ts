import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CheckboxesComponent} from './checkboxes.component';

/**
 * checkbox多选组件
 */
@NgModule({
  declarations: [
    CheckboxesComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CheckboxesComponent
  ]
})
export class CheckboxesModule {
}
