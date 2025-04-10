import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MapComponent} from './map.component';
import {HttpClientModule} from '@angular/common/http';

/**
 * 地图
 */
@NgModule({
  declarations: [
    MapComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    MapComponent
  ]
})
export class MapModule {
}
