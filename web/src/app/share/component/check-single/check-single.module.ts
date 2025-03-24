import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckSingleComponent } from './check-single.component';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    CheckSingleComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    CheckSingleComponent
  ]
})
export class CheckSingleModule { }
