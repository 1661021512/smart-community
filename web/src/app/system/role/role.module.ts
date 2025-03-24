import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleRoutingModule } from './role-routing.module';
import { IndexComponent } from './index/index.component';
import {YzPageModule, YzSizeModule} from "@yunzhi/ng-common";
import {AddComponent} from './add/add.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { EditComponent } from './edit/edit.component';
import {ValidatorClassModule} from '../../share/directive/validator-class/validator-class.module';

/**
 * 角色管理
 */

@NgModule({
  declarations: [
    IndexComponent,
    AddComponent,
    EditComponent

  ],
  imports: [
    CommonModule,
    RoleRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    YzPageModule,
    YzSizeModule,
    ValidatorClassModule,
    FormsModule,
  ]
})
export class RoleModule { }
