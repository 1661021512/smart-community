import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SkillMultiSelectComponent} from './skill-multi-select-input/skill-multi-select.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {MultiSelectModule} from '../share/component/multi-select/multi-select.module';

/**
 * 特长、技能
 */
@NgModule({
  declarations: [
    SkillMultiSelectComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    MultiSelectModule
  ],
  exports: [SkillMultiSelectComponent]
})
export class SkillShareModule {
}
