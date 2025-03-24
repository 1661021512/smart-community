import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {IndexComponent} from './index/index.component';
import {AddComponent} from './add/add.component';
import {HouseComponent} from './house/house.component';
import {EditComponent} from './edit/edit.component';


const routes = [
  {
    path: '',
    component: IndexComponent
  }, {
    path: 'add',
    component: AddComponent,
    data: {
      title: '新增'
    }
  }, {
    path: 'house/:buildingId',
    component: HouseComponent,
    data: {
      title: '生成住房'
    }
  }, {
    path: 'edit/:id',
    component: EditComponent,
    data: {
      title: '编辑'
    }
  }, {
    path: 'view-2d',
    loadChildren: () => import('./../building/view2d/view2d.module').then(m => m.View2dModule),
    data: {
      title: ''
    }
  }
] as Route[];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuildingBungalowRoutingModule {
}
