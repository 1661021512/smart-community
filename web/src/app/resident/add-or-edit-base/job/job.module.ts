import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {JobComponent} from './job.component';
import {ReactiveFormsModule} from '@angular/forms';
import {EnterpriseShareModule} from '../../../enterprise/enterprise-share.module';
import {JobTypeShareModule} from '../../../job-type/job-type-share.module';
import {SkillShareModule} from '../../../skill/skill-share.module';


@NgModule({
  declarations: [JobComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EnterpriseShareModule,
    JobTypeShareModule,
    SkillShareModule
  ],
  exports: [JobComponent]
})
export class JobModule {
}
