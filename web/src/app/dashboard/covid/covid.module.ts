import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CovidComponent } from './covid.component';

/**
 * 接种完成率
 */
@NgModule({
  declarations: [
    CovidComponent
  ],
  exports: [
    CovidComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CovidModule { }
