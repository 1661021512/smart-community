import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index.component';
import {ReactiveFormsModule} from "@angular/forms";
import {YzModalModule, YzPageModule, YzSizeModule} from "@yunzhi/ng-common";
import {EditModule} from "../edit/edit.module";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    YzSizeModule,
    YzPageModule,
    YzModalModule,
    EditModule,
    RouterModule
  ],
  exports:[
    IndexComponent
  ]
})
export class IndexModule { }
