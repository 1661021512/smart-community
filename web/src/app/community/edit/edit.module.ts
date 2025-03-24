import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EditComponent} from './edit.component';
import {ReactiveFormsModule} from '@angular/forms';
import {TownShareModule} from '../../town/town-share.module';
import {UploaderModule} from '../../attachment/uploader/uploader.module';
import {ValidatorClassModule} from '../../share/directive/validator-class/validator-class.module';



@NgModule({
  declarations: [EditComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TownShareModule,
    UploaderModule,
    ValidatorClassModule
  ],
  exports: [
    EditComponent
  ]
})
export class EditModule { }
