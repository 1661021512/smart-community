import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from './index/index.component';
import {EditComponent} from './edit/edit.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    data: {
      title: ''
    }
  },
  {
    path: 'add',
    loadChildren: () => import('./add/add.module').then(m => m.AddModule),
    data: {
      title: '新增'
    }
  },
  {
    path: 'view',
    loadChildren: () => import('./view/view.module').then(m => m.ViewModule),
    data: {
      title: '详情'
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
export class ResidentRoutingModule {
}
