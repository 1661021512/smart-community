import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditComponent} from './edit.component';
import {HouseEditModule} from '../../../house/house-edit/house-edit.module';

/**
 * 网格员编辑自己负责的住房
 */
@NgModule({
  declarations: [
    EditComponent
  ],
  imports: [
    CommonModule,
    HouseEditModule
  ],
  exports: [
    EditComponent
  ]
})
export class EditModule {
}
