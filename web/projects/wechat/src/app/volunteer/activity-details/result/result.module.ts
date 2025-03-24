import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ResultComponent} from "./result.component";
import {IonicModule} from "@ionic/angular";
import {ResultRoutingModule} from './result-routing.module';

/**
 * 报名结果查看
 */
@NgModule({
  declarations: [ResultComponent],
  imports: [
    CommonModule,
    IonicModule,
    ResultRoutingModule
  ],
  exports: [
    ResultComponent
  ]
})
export class ResultModule { }
