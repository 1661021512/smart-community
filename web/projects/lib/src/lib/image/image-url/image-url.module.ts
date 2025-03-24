import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImageUrlPipe} from './image-url.pipe';

/**
 * 图片的URL地址
 */
@NgModule({
  declarations: [
    ImageUrlPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ImageUrlPipe
  ]
})
export class ImageUrlModule {
}
