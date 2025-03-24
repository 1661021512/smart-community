import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DetailComponent} from "./detail.component";
import {ResidentPipeModule} from "../../resident/pipe/resident-pipe.module";
import {PhoneShowModule} from "../../resident/phone-show/phone-show.module";
import {HousePlacePipeModule} from "../../resident/pipe/housePlace-pipe.module";
import {PipeModule} from "../pipe/pipe.module";
import {BackModule} from "../../share/component/back/back.module";

/**
 * 车辆管理详情
 */
@NgModule({
  declarations: [DetailComponent],
  imports: [
    CommonModule,
    ResidentPipeModule,
    PhoneShowModule,
    HousePlacePipeModule,
    PipeModule,
    BackModule
  ],
  exports: [DetailComponent]
})
export class DetailModule {
}
