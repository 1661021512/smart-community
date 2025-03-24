import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditorComponent} from './editor.component';
import {EditorModule as TinyEditorModule, TINYMCE_SCRIPT_SRC} from '@tinymce/tinymce-angular';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    EditorComponent
  ],
  imports: [
    CommonModule,
    TinyEditorModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js'}
  ],
  exports: [
    EditorComponent
  ]
})
export class EditorModule {
}
