import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EmployedPersonsRoutingModule} from "./employed-persons-routing.module";
import {EditModule} from "./edit/edit.module";
import {IndexModule} from "./index/index.module";
import {ViewEnrollmentModule} from "./view/view-enrollment.module";

/**
 * 就业人员管理模块
 */

@NgModule({
  imports: [
    CommonModule,
    EmployedPersonsRoutingModule,
    EditModule,
    IndexModule,
    ViewEnrollmentModule
  ]
})
export class EmployedPersonsModule { }
