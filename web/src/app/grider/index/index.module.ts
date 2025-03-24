import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IndexComponent} from './index.component';
import {YzPageModule, YzSizeModule} from '@yunzhi/ng-common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ValidatorClassModule} from '../../share/directive/validator-class/validator-class.module';
import {PhoneShowModule} from '../../user/phone-show/phone-show.module';
import {AddModule} from './add/add.module';
import {IndexRoutingModule} from './index-routing.module';
import {EditModule} from './edit/edit.module';

/**
 * 网格员管理
 */
@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    FormsModule,
    AddModule,
    EditModule,
    ReactiveFormsModule,
    YzPageModule,
    YzSizeModule,
    ValidatorClassModule,
    PhoneShowModule,
    IndexRoutingModule
  ],
  exports: [
    IndexComponent
  ]
})
export class IndexModule {
}
