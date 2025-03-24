import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivityStatePipe} from './activity-state.pipe';

@NgModule({
  declarations: [
    ActivityStatePipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ActivityStatePipe,
  ]
})
export class PipeModule { }
