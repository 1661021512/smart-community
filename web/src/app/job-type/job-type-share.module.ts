import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {JobTypeMultiSelectComponent} from './job-type-multi-input/job-type-multi-select.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {MultiSelectModule} from '../share/component/multi-select/multi-select.module';

/**
 * 工作，求职意向相关
 */
@NgModule({
  declarations: [
    JobTypeMultiSelectComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    MultiSelectModule
  ], exports: [
    JobTypeMultiSelectComponent
  ]
})
export class JobTypeShareModule {
}
