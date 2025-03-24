import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {IndexComponent} from './index.component';
import {AddComponent} from './add/add.component';
import {EditComponent} from './edit/edit.component';

let routes: Route[] = [
  {
    path: '',
    component: IndexComponent,
    data: {
      title: ''
    }
  }, {
    path: 'add',
    component: AddComponent,
    data: {
      title: '新增'
    }
  },
  {
    path: 'edit/:id',
    component: EditComponent,
    data: {
      title: '编辑'
    }
  },
  {
    path: 'house/:griderId',
    loadChildren: () => import('./house/house.module').then(m => m.HouseModule),
    data: {
      title: '网格管理'
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class IndexRoutingModule {
}
