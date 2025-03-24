import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditComponent } from './edit.component';
import {ResidentEditModule} from '../../../resident/resident-edit/resident-edit.module';

/**
 * 网格员管理自己负责的居民
 */
@NgModule({
  declarations: [
    EditComponent
  ],
  imports: [
    CommonModule,
    ResidentEditModule
  ],
  exports: [
    EditComponent
  ]
})
export class EditModule { }
