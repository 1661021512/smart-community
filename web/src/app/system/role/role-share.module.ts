import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RoleCheckboxComponent} from './role-checkbox/role-checkbox.component';

/**
 * 角色共享模块
 */
@NgModule({
  declarations: [
    RoleCheckboxComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RoleCheckboxComponent
  ]
})
export class RoleShareModule {
}
