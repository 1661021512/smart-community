import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ShangyiComponent} from './shangyi.component';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [ShangyiComponent],
  imports: [
    CommonModule,
    RouterModule
  ],exports: [
    ShangyiComponent
  ]
})
export class ShangyiModule { }
