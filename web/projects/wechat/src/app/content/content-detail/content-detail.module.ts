import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContentDetailComponent} from './content-detail.component';
import {IonicModule} from '@ionic/angular';
import {SafeModule} from '../../../../../../src/app/share/pipe/safe/safe.module';

/**
 * 内容详情
 */
@NgModule({
  declarations: [
    ContentDetailComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    SafeModule
  ],
  exports: [
    ContentDetailComponent
  ]
})
export class ContentDetailModule {
}
