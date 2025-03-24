import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RelationshipRoutingModule} from './relationship-routing.module';
import {IndexComponent} from './index/index.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EditComponent} from './edit/edit.component';
import {YzPageModule, YzSizeModule} from '@yunzhi/ng-common';
import {AddModule} from './add/add.module';
import {ValidatorClassModule} from "../../share/directive/validator-class/validator-class.module";

/**
 * 居民关系管理
 */
@NgModule({
  declarations: [
    IndexComponent,
    EditComponent
  ],
    imports: [
        CommonModule,
        RelationshipRoutingModule,
        FormsModule,
        AddModule,
        ReactiveFormsModule,
        YzPageModule,
        YzSizeModule,
        ValidatorClassModule
    ]
})
export class RelationshipModule {
}
