import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MapComponent} from './map.component';
import {MapRoutingModule} from './map-routing.module';
import {UploaderModule} from '../../attachment/uploader/uploader.module';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    MapComponent
  ],
  imports: [
    CommonModule,
    MapRoutingModule,
    UploaderModule,
    ReactiveFormsModule
  ]
})
export class MapModule {
}
