import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddComponent} from './add.component';
import {YzUploaderModule} from '@yunzhi/ng-common';
import {ReactiveFormsModule} from '@angular/forms';
import {DateModule} from '../../../share/component/date/date.module';
import {EditorModule} from '../../../editor/editor.module';
import {ActivityShareModule} from '../activity-share.module';


/**
 * 志愿者活动新增
 */
@NgModule({
  declarations: [
    AddComponent
  ],
  imports: [
    CommonModule,
    YzUploaderModule,
    DateModule,
    ReactiveFormsModule,
    EditorModule,
    ActivityShareModule
  ],
  exports: [
    AddComponent
  ]
})
export class AddModule {
}
