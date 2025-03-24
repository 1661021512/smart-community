import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddComponent} from "./add.component";
import {ReactiveFormsModule} from "@angular/forms";
import {ValidatorClassModule} from "../../../share/directive/validator-class/validator-class.module";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [AddComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ValidatorClassModule
  ],
  exports: [
    AddComponent
  ]
})
export class AddModule { }
