import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DemoComponent} from './demo.component';
import {EditModule} from '../edit/edit.module';
import {YzModalModule} from '@yunzhi/ng-common';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [DemoComponent],
  imports: [
    CommonModule,
    EditModule,
    YzModalModule,
    ReactiveFormsModule
  ],
  exports: [DemoComponent]
})
export class DemoModule {
}
