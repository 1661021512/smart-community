import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SignUpComponent} from './sign-up.component';
import {IonicModule} from '@ionic/angular';
import {SexSelectModule} from './sex-select/sex-select.module';
import {ReactiveFormsModule} from '@angular/forms';
import {EducationModule} from './education/education.module';
import {SignUpRoutingModule} from './sign-up-routing.module';

/**
 * 不出意外的话，当前模块存在一定的问题
 * 启用该模块时，会导致 ng s wechat发生异常
 */
@NgModule({
  declarations: [
    SignUpComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    SexSelectModule,
    ReactiveFormsModule,
    EducationModule,
    SignUpRoutingModule
  ],
  exports: [
    SignUpComponent
  ]
})
export class SignUpModule {
}
