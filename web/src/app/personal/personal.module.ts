import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PersonalComponent} from './personal.component';
import {PersonalRoutingModule} from './personal-routing.module';
import { ModifyPasswordComponent } from './modify-password/modify-password.component';
import {ReactiveFormsModule} from "@angular/forms";

/**
 * 个人中心
 */
@NgModule({
  declarations: [
    PersonalComponent,
    ModifyPasswordComponent
  ],
  imports: [
    CommonModule,
    PersonalRoutingModule,
    ReactiveFormsModule
  ]
})
export class PersonalModule {
}
