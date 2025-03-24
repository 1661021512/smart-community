import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VolunteerRoutingModule} from './volunteer-routing.module';

/**
 *志愿者模块
 */
@NgModule({
  imports: [
    CommonModule,
    VolunteerRoutingModule
  ]
})
export class VolunteerModule {
}
