import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IndexComponent} from "./index.component";
import {YzPageModule, YzSizeModule} from "@yunzhi/ng-common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AddModule} from "../../relationship/add/add.module";
import {ValidatorClassModule} from "../../../share/directive/validator-class/validator-class.module";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    FormsModule,
    AddModule,
    ReactiveFormsModule,
    YzPageModule,
    YzSizeModule,
    RouterModule,
    ValidatorClassModule
  ],
  exports: [
    IndexComponent
  ]
})
export class IndexModule { }
