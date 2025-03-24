import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditComponent} from './edit.component';
import {HouseEditModule} from '../house-edit/house-edit.module';

@NgModule({
  declarations: [
    EditComponent
  ],
  imports: [
    CommonModule,
    HouseEditModule
  ], exports: [
    EditComponent
  ]
})
export class EditModule {
}
