import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddComponent} from "./add.component";
import {ReactiveFormsModule} from "@angular/forms";
import {EditorModule} from "../../editor/editor.module";
import {YzUploaderModule} from '@yunzhi/ng-common';



@NgModule({
  declarations: [AddComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EditorModule,
    YzUploaderModule
  ],
  exports:[
    AddComponent
  ]
})
export class AddModule { }
