import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TrueOrFalseComponent} from './true-or-false.component';
import {ReactiveFormsModule} from '@angular/forms';

/**
 * 是否组件
 */
@NgModule({
  declarations: [TrueOrFalseComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    TrueOrFalseComponent
  ]
})
export class TrueOrFalseModule {
}
