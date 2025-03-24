import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DutyRoutingModule} from "./duty-routing.module";
import {AddModule} from "./add/add.module";
import {EditModule} from "./edit/edit.module";
import {IndexModule} from "./index/index.module";

/**
 * 岗位管理
 */

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    AddModule,
    EditModule,
    IndexModule,
    DutyRoutingModule
  ]
})
export class DutyModule { }
