import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CultAutoCompleteComponent } from './cult-auto-complete.component';
import {AutoCompleteModule} from '../../share/component/auto-complete/auto-complete.module';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    CultAutoCompleteComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AutoCompleteModule
  ],
  exports: [
    CultAutoCompleteComponent
  ]
})
export class CultAutoCompleteModule { }
