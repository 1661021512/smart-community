import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddResidentComponent} from './add-resident.component';
import {ResidentAddModule} from '../../../resident/resident-add/resident-add.module';

/**
 * 向住房中添加居民
 */
@NgModule({
  declarations: [
    AddResidentComponent
  ],
  imports: [
    CommonModule,
    ResidentAddModule
  ],
  exports: [
    AddResidentComponent
  ]
})
export class AddResidentModule {
}
