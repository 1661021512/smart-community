import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditComponent} from './edit.component';
import {VillageEditModule} from '../../village/edit/village-edit.module';

/**
 * 编辑平房
 * 直接调用编辑楼房的组件
 */
@NgModule({
  declarations: [
    EditComponent
  ],
  imports: [
    CommonModule,
    VillageEditModule
  ],
  exports: [
    EditComponent
  ]
})
export class EditModule {
}
