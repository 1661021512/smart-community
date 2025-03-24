import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IndexComponent} from "./index.component";
import {YzPageModule, YzSizeModule} from "@yunzhi/ng-common";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from '@angular/forms';

/**
 * 物业公司管理首页
 */

@NgModule({
  declarations: [IndexComponent],
    imports: [
        CommonModule,
        YzPageModule,
        RouterModule,
        YzSizeModule,
        ReactiveFormsModule
    ],
  exports: [
    IndexComponent
  ]
})
export class IndexModule {
}
