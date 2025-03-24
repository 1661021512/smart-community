import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ResidentEditComponent} from './resident-edit.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ResidentPipeModule} from '../pipe/resident-pipe.module';
import {BasicModule} from '../add-or-edit-base/basic/basic.module';
import {AgedModule} from '../add-or-edit-base/aged/aged.module';
import {JobModule} from '../add-or-edit-base/job/job.module';
import {StudentModule} from '../add-or-edit-base/student/student.module';
import {SoldierModule} from '../add-or-edit-base/soldier/soldier.module';
import {SecurityModule} from '../add-or-edit-base/security/security.module';

/**
 * 编辑居民
 */
@NgModule({
  declarations: [ResidentEditComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ResidentPipeModule,
    BasicModule,
    AgedModule,
    JobModule,
    StudentModule,
    SoldierModule,
    SecurityModule
  ],
  exports: [ResidentEditComponent]
})
export class ResidentEditModule {
}
