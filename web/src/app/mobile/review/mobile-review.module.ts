import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MobileReviewComponent} from './mobile-review.component';

/**
 * 阅览手机效果
 */
@NgModule({
  declarations: [
    MobileReviewComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MobileReviewComponent
  ]
})
export class MobileReviewModule {
}
