import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IndexComponent} from './index/index.component';
import {ReactiveFormsModule} from '@angular/forms';
import {TownRoutingModule} from './town-routing.module';
import {RouterModule} from '@angular/router';
import {TownShareModule} from './town-share.module';
import {YzPageModule, YzSizeModule, YzUploaderModule} from '@yunzhi/ng-common';
import {ValidatorClassModule} from '../share/directive/validator-class/validator-class.module';
import {UploaderModule} from '../attachment/uploader/uploader.module';
import {EditModule} from './edit/edit.module';
import {AddModule} from './add/add.module';

/**
 * 乡镇管理
 */
@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    EditModule,
    AddModule,
    TownShareModule,
    ReactiveFormsModule,
    YzPageModule,
    YzSizeModule,
    TownRoutingModule,
    RouterModule,
    ValidatorClassModule,
    YzUploaderModule,
    UploaderModule
  ]
})
export class TownModule {
}
