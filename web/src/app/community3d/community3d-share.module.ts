import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {Community3dSelectComponent} from "./community3d-select/community3d-select.component";


@NgModule({
  declarations: [
    Community3dSelectComponent
  ],
  imports: [
    CommonModule, ReactiveFormsModule
  ],
  exports: [
    Community3dSelectComponent
  ]
})
export class Community3dShareModule {
}
