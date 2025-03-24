import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewComponent } from './view.component';
import {IonicModule} from '@ionic/angular';
import {SafeModule} from '../../../../../../src/app/share/pipe/safe/safe.module';

/**
 * 查看通知
 */

@NgModule({
  declarations: [
    ViewComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    SafeModule
  ],
  exports: [
    ViewComponent
  ]
})
export class ViewModule { }
