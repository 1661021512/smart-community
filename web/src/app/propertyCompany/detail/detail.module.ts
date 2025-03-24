import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DetailComponent} from './detail.component';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [DetailComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    DetailComponent
  ]
})
export class DetailModule { }
