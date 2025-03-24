import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TrueOrFalsePipe} from './true-or-false.pipe';


@NgModule({
  declarations: [
    TrueOrFalsePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TrueOrFalsePipe
  ]
})
export class TrueOrFalseModule {
}
