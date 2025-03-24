import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResidentsComponent } from './residents.component';



@NgModule({
  declarations: [
    ResidentsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ResidentsComponent
  ]
})
export class ResidentsModule { }
