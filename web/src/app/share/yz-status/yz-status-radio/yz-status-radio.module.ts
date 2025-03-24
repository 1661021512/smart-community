import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {YzStatusRadioComponent} from './yz-status-radio.component';
import {ReactiveFormsModule} from '@angular/forms';

/**
 * 适用于StatusEnum的单选组件
 */
@NgModule({
  declarations: [YzStatusRadioComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [YzStatusRadioComponent]
})
export class YzStatusRadioModule { }
