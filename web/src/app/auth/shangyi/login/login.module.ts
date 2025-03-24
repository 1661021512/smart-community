import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from './login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {YzSubmitButtonModule} from '@yunzhi/ng-common';



@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    YzSubmitButtonModule
  ],
  exports: [LoginComponent]
})
export class LoginModule { }
