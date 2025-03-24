import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Covid19RoutingModule} from './covid19-routing.module';
import {IndexModule} from './index/index.module';

/**
 * 新冠专项
 */
@NgModule({
  imports: [
    CommonModule,
    IndexModule,
    Covid19RoutingModule
  ]
})
export class Covid19Module {
}
