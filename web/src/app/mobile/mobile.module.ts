import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MobileReviewModule} from './review/mobile-review.module';

/**
 * 手机端相关
 */
@NgModule({
  imports: [
    CommonModule,
    MobileReviewModule
  ]
})
export class MobileModule {
}
