import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContentDetailComponent} from './content-detail.component';
import {MobileReviewModule} from '../../mobile/review/mobile-review.module';
import {EditorModule} from '../../editor/editor.module';
import {ReactiveFormsModule} from '@angular/forms';
import {SafeModule} from '../../share/pipe/safe/safe.module';
import {RouterModule} from '@angular/router';

/**
 * 内容详情
 */
@NgModule({
  declarations: [
    ContentDetailComponent
  ],
  imports: [
    CommonModule,
    MobileReviewModule,
    EditorModule,
    ReactiveFormsModule,
    SafeModule,
    RouterModule
  ], exports: [
    ContentDetailComponent
  ]
})
export class ContentDetailModule {
}
