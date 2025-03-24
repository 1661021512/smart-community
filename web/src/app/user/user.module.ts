import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserRoutingModule} from './user-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IndexComponent} from './index/index.component';
import {YzPageModule, YzSizeModule} from '@yunzhi/ng-common';
import {RoleShareModule} from '../system/role/role-share.module';
import {RegionShareModule} from '../region/region-share.module';
import {UserStatusPipe} from './user-status.pipe';
import {RegionSelectOfCurrentUserModule} from '../region/region-select-of-current-user/region-select-of-current-user.module';
import {EditModule} from './edit/edit.module';
import {AddModule} from './add/add.module';
import { RegionPipe } from './pipe/region.pipe';

/**
 * 用户管理
 */
@NgModule({
  declarations: [
    IndexComponent,
    UserStatusPipe,
    RegionPipe
  ],
  exports: [],
  imports: [
    AddModule,
    CommonModule,
    EditModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    YzPageModule,
    YzSizeModule,
    RoleShareModule,
    RegionShareModule,
    RegionSelectOfCurrentUserModule,
  ]
})
export class UserModule {
}
