import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import {BasicComponent} from './base/basic.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ResetPasswordComponent} from './base/reset-password/reset-password.component';
import {LoginComponent as BasicLogin} from './base/login/login.component';
import {HttpClientModule} from '@angular/common/http';
import {VerificationCodeComponent} from './base/verification-code/verification-code.component';
import {YzSubmitButtonModule} from '@yunzhi/ng-common';
import {ShangyiModule} from './shangyi/shangyi.module';
import {LoginModule} from './shangyi/login/login.module';


@NgModule({
  declarations: [
    BasicComponent,
    ResetPasswordComponent,
    BasicLogin,
    VerificationCodeComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    LoginModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    YzSubmitButtonModule,
    ShangyiModule
  ],
  exports: [
    BasicComponent
  ]
})
export class AuthModule {
}
