import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ViewComponent} from './view.component';

const routes: Routes = [
  {
    path: ':id',
    component: ViewComponent,
    data: {
      title: '查看'
    }
  },
  {
    path: ':id/relationship',
    loadChildren: () => import('./../relationship-map/relationship-map.module')
      .then(m => m.RelationshipMapModule),
    data: {
      title: '居民关系'
    }
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ViewRoutingModule {
}
