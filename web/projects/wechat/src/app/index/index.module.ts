
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IndexComponent} from './index.component';
import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NoticeIndexModule} from '../notice/notice-index/notice-index.module';


@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    IonicModule,
    NoticeIndexModule,
    RouterModule
  ],
  exports: [IndexComponent]
})
export class IndexModule { }
