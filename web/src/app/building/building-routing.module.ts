import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {IndexComponent} from './index/index.component';
import {AddComponent} from './add/add.component';
import {EditComponent} from './edit/edit.component';

const routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
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
  }, {
    path: 'house',
    loadChildren: () => import('./house/house.module').then(m => m.HouseModule),
    data: {
      title: ''
    }
  },{
    path: 'view-2d',
    loadChildren: () => import('./view2d/view2d.module').then(m => m.View2dModule),
    data: {
      title: ''
    }
  },
] as Route[];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuildingRoutingModule {
}
