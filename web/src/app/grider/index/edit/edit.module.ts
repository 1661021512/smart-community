import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditComponent} from './edit.component';
import {RegionSelectOfCurrentUserModule} from '../../../region/region-select-of-current-user/region-select-of-current-user.module';
import {ReactiveFormsModule} from '@angular/forms';
import {ValidatorClassModule} from '../../../share/directive/validator-class/validator-class.module';

/**
 * 编辑网格员
 */
@NgModule({
  declarations: [
    EditComponent
  ],
  imports: [
    CommonModule,
    RegionSelectOfCurrentUserModule,
    ReactiveFormsModule,
    ValidatorClassModule
  ],
  exports: [
    EditComponent
  ]
})
export class EditModule {
}
