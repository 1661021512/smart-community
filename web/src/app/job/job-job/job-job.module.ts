import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {JobJobRoutingModule} from "./job-job-routing.module";
import {ReactiveFormsModule} from "@angular/forms";

/**
 *  招聘咨询模块
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    JobJobRoutingModule,
    ReactiveFormsModule
  ]
})
export class JobJobModule { }
