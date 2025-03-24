import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaritalPipe } from './marital.pipe';



@NgModule({
  declarations: [
    MaritalPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MaritalPipe
  ]
})
export class MaritalPipeModule { }
