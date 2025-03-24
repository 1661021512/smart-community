import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {HouseComponent} from './house.component';

const routes = [
  {
    path: ':id',
    children: [{
      path: '',
      component: HouseComponent,
      data: {
        title: '生成住房'
      }
    }]
  }
] as Route[];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HouseRoutingModule {
}
