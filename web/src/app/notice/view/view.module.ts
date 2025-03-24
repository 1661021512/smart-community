import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ViewComponent} from "./view.component";
import {SafeModule} from "../../share/pipe/safe/safe.module";
import {MobileReviewModule} from '../../mobile/review/mobile-review.module';
import {BackModule} from '../../share/component/back/back.module';

/**
 * 查看页面
 */

@NgModule({
  declarations: [ViewComponent],
  imports: [
    CommonModule,
    SafeModule,
    MobileReviewModule,
    BackModule
  ],
  exports:[
    ViewComponent
  ]
})
export class ViewModule { }
