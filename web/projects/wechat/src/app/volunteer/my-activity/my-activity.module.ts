import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MyActivityComponent} from './my-activity.component'
import {IonicModule} from "@ionic/angular";

@NgModule({
  declarations: [MyActivityComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[
    MyActivityComponent
  ]
})
export class MyActivityModule { }
