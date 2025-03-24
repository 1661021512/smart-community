import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EditOrSetWeightComponent} from './edit-or-set-weight.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [EditOrSetWeightComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [EditOrSetWeightComponent]
})
export class EditOrSetWeightModule { }
