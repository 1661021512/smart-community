import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Route, RouterModule} from '@angular/router';
import {ChooseHouseComponent} from '../add-or-edit-base/choose-house/choose-house.component';
import {AddComponent} from './add.component';

const routes = [
  {
    path: '',
    component: ChooseHouseComponent,
    data: {
      title: '新增'
    }
  },
  {
    path: 'house/:houseId',
    component: AddComponent,
    data: {
      title: '新增'
    }
  },
  {
    path: 'edit/:houseId/resident/:residentId',
    component: AddComponent,
    data: {
      title: '编辑',
      description: '编辑某个房子中的居中信息，在这使用居民ID主要是为了和上一个路由统一'
    }
  }
] as Route[]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AddRoutingModule {
}
