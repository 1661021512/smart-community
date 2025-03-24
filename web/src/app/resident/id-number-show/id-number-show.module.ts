import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IdNumberShowComponent} from './id-number-show.component';

/**
 * 点击一次显示身份证号码，再点一次，隐藏身份证号码
 */
@NgModule({
  declarations: [
    IdNumberShowComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    IdNumberShowComponent
  ]
})
export class IdNumberShowModule {
}
