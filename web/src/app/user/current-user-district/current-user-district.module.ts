import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentUserDistrictComponent } from './current-user-district.component';

/**
 * 当前登录用户区域组件
 */

@NgModule({
  declarations: [
    CurrentUserDistrictComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CurrentUserDistrictComponent
  ]
})
export class CurrentUserDistrictModule { }
