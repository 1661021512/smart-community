import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {JobRoutingModule} from "./job-routing.module";

/**
 * 就业服务模块
 */
@NgModule({
  imports: [
    CommonModule,
    JobRoutingModule,
  ],
})
export class JobModule {
}
