import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddComponent} from './add.component';
import {ReactiveFormsModule} from '@angular/forms';
import {WelfareJobShareModule} from '../welfare-job-share.module';
import {DateModule} from '../../../share/component/date/date.module';

@NgModule({
  declarations: [AddComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    WelfareJobShareModule,
    DateModule,
  ],
  exports: [AddComponent]
})
export class AddModule {
}
