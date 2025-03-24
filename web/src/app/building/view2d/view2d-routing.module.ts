import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {View2dComponent} from './view2d.component';

const routes: Routes = [
  {
    path: ':buildingId',
    component: View2dComponent,
    data: {
      title: '查看居民'
    }
  }
];

/**
 * 路由
 */
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class View2dRoutingModule {
}
