import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {ViewComponent} from './view.component';
import {SafeModule} from '../../../../../../src/app/share/pipe/safe/safe.module';

/**
 * 查看详情
 */
@NgModule({
  declarations: [ViewComponent],
  imports: [
    CommonModule,
    IonicModule,
    SafeModule,
  ],
  exports: [ViewComponent]
})
export class ViewModule {
}
