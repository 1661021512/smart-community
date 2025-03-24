import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditComponent } from './edit.component';
import {ReactiveFormsModule} from '@angular/forms';
import {DateModule} from '../../../share/component/date/date.module';
import {EditorModule} from '../../../editor/editor.module';
import {YzUploaderModule} from '@yunzhi/ng-common';
import {ImageUrlModule} from '../../../../../projects/lib/src/lib/image/image-url/image-url.module';



@NgModule({
  declarations: [
    EditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DateModule,
    EditorModule,
    YzUploaderModule,
    ImageUrlModule
  ]
})
export class EditModule { }
