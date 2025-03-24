import { NgModule } from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {HouseComponent} from './house.component';
import {GriderHouseAddComponent} from './grider-house-add/grider-house-add.component';

const routes: Route[] = [
  {
    path: '',
    component: HouseComponent,
    data: {
      title: ''
    }
  },
  {
    path: 'add/:girderId',
    component: GriderHouseAddComponent,
    data: {
      title: '添加住房'
    }
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class HouseRoutingModule { }
