import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccessDirective} from './access.directive';
import { AccessCheckboxComponent } from './access-checkbox/access-checkbox.component';

/**
 * 权限共享模块
 */
@NgModule({
  declarations: [
    AccessDirective,
    AccessCheckboxComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AccessDirective,
    AccessCheckboxComponent
  ]
})
export class AccessShareModule {
}
