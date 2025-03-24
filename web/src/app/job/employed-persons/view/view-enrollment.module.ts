import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewEnrollmentComponent } from './view-enrollment.component';

/**
 * 就业服务->就业人员管理->详情
 */

@NgModule({
  declarations: [
    ViewEnrollmentComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ViewEnrollmentComponent
  ]
})
export class ViewEnrollmentModule { }
