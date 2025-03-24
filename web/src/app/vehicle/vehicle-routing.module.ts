import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from './index/index.component';
import {DetailComponent} from "./detail/detail.component";
import {VehicleAddComponent} from "./vehicle-add/vehicle-add.component";
import {VehicleEditComponent} from './vehicle-edit/vehicle-edit.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'detail/:id',
    component: DetailComponent
  },
  {
    path: 'add',
    component: VehicleAddComponent,
    data: {
      title: '新增'
    }
  },
  {
    path: 'edit/:id',
    component: VehicleEditComponent,
    data: {
      title: '编辑'
    }
  },
  {
    path: 'view/:id',
    component: DetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleRoutingModule {
}
