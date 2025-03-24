import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ViewComponent} from './view.component';
import {DateModule} from '../../../share/component/date/date.module';
import {ReactiveFormsModule} from '@angular/forms';
import {PipeModule} from '../../../../../projects/lib/src/lib/activity/pipe/pipe.module';

/**
 * 志愿者活动管理 -》查看详情
 * #1055
 */
@NgModule({
  declarations: [
    ViewComponent
  ],
  imports: [
    CommonModule,
    DateModule,
    ReactiveFormsModule,
    PipeModule
  ],
  exports: [
    ViewComponent
  ]
})
export class ViewModule {
}
