import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ViewModule} from "./view/view.module";
import {IndexModule} from "./index/index.module";
import {EditModule} from "./edit/edit.module";
import {NoticeRoutingModule} from "./notice-routing.module";
import {AddModule} from "./add/add.module";

/**
 * 通知公告
 */

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ViewModule,
    IndexModule,
    EditModule,
    AddModule,
    NoticeRoutingModule
  ]
})
export class NoticeModule { }
