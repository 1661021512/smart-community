import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IndexModule} from "./index/index.module";
import {StatisticsRoutingModule} from "./statistics-routing.module";


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    IndexModule,
    StatisticsRoutingModule
  ]
})
export class StatisticsModule { }
