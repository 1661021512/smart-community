import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ViewComponent} from './view.component';
import {HouseDetailModule} from '../../../house/house-detail/house-detail.module';


@NgModule({
  declarations: [
    ViewComponent
  ],
  imports: [
    CommonModule,
    HouseDetailModule
  ],
  exports: [
    ViewComponent
  ]
})
export class ViewModule {
}
