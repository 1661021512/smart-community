import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EditComponent} from "./edit.component";
import {ReactiveFormsModule} from "@angular/forms";
import {EditorModule} from "../../editor/editor.module";
import {YzUploaderModule} from '@yunzhi/ng-common';



@NgModule({
  declarations: [EditComponent],
  imports: [
    CommonModule,
    EditorModule,
    ReactiveFormsModule,
    YzUploaderModule,
  ],
  exports:[
    EditComponent
  ]
})
export class EditModule { }
