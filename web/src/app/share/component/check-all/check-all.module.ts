import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CheckAllComponent} from './check-all.component';
import {ReactiveFormsModule} from '@angular/forms';

/**
 * 全选
 */
@NgModule({
  declarations: [
    CheckAllComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    CheckAllComponent
  ]
})
export class CheckAllModule {
}
