import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from './index/index.component';
import {DetailComponent} from "./detail/detail.component";
import {AddComponent} from "./add/add.component";
import {EditComponent} from './edit/edit.component';


const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'detail/:id',
    component: DetailComponent,
    data: {
      title: '查看'
    }
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
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropertyCompanyRoutingModule { }
