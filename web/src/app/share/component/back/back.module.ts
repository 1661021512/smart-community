import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BackButtonComponent} from './back-button.component';

/**
 * 后退
 */
@NgModule({
  declarations: [
    BackButtonComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BackButtonComponent
  ]
})
export class BackModule {
}
