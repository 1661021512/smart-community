import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HousePlacePipe} from "./housePlace.pipe";

/**
 * 房屋地址管道
 */
@NgModule({
  declarations: [HousePlacePipe],
  imports: [
    CommonModule
  ],
  exports: [
    HousePlacePipe
  ]
})
export class HousePlacePipeModule {
}
