import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SexSelectComponent } from './sex-select.component';
import {IonicModule} from '@ionic/angular';
import {ReactiveFormsModule} from '@angular/forms';

/**
 * 性别选择组件
 */
@NgModule({
  declarations: [
    SexSelectComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule
  ],
  exports: [
    SexSelectComponent
  ]
})
export class SexSelectModule { }
