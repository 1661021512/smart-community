import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IndexComponent} from "./index.component";
import {ReactiveFormsModule} from "@angular/forms";
import {YzPageModule, YzSizeModule} from "@yunzhi/ng-common";
import {NoticeRoutingModule} from "../notice-routing.module";



@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    YzPageModule,
    YzSizeModule,
    NoticeRoutingModule
  ],
  exports:[
    IndexComponent
  ]
})
export class IndexModule { }
