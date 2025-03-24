import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index.component';
import {YzPageModule, YzSizeModule} from '@yunzhi/ng-common';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    YzSizeModule,
    YzPageModule,
    RouterModule
  ],
  exports: [
    IndexComponent
  ]
})
export class IndexModule { }
