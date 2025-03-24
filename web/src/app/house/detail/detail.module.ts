import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DetailComponent} from './detail.component';
import {HouseDetailModule} from '../house-detail/house-detail.module';

@NgModule({
  declarations: [
    DetailComponent
  ],
  imports: [
    CommonModule,
    HouseDetailModule
  ],
  exports: [
    DetailComponent
  ]
})
export class DetailModule {
}
