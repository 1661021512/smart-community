import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditComponent} from './edit.component';
import {ResidentEditModule} from '../resident-edit/resident-edit.module';

/**
 * 编辑居民
 */
@NgModule({
  declarations: [
    EditComponent
  ],
  imports: [
    CommonModule,
    ResidentEditModule],
  exports: [EditComponent]
})
export class EditModule {
}
