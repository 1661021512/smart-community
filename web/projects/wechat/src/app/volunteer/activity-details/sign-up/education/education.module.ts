import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EducationComponent } from './education.component';
import {IonicModule} from '@ionic/angular';
import {ReactiveFormsModule} from '@angular/forms';

/**
 * 小程序端文化程度组件
 */

@NgModule({
  declarations: [
    EducationComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule
  ],
  exports: [
    EducationComponent
  ]
})
export class EducationModule { }
