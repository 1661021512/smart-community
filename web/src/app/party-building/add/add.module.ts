import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddComponent} from "./add.component";
import {ReactiveFormsModule} from '@angular/forms';
import {ValidatorClassModule} from '../../share/directive/validator-class/validator-class.module';



@NgModule({
  declarations: [
    AddComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ValidatorClassModule
  ],
  exports: [
    AddComponent
  ]
})
export class AddModule { }
