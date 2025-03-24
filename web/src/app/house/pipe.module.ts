import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OwnedPipe} from './owned.pipe';


@NgModule({
  declarations: [
    OwnedPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    OwnedPipe
  ]
})
export class OwnedPipeModule {
}
