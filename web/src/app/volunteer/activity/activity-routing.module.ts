import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {ActivityComponent} from './activity.component';
import {ViewComponent} from './view/view.component';
import {AddComponent} from './add/add.component';
import {EditComponent} from './edit/edit.component';
import {EditModule} from './edit/edit.module';

const routes: Route[] = [
  {
    path: '',
    component: ActivityComponent,
    data: {
      title: ''
    }
  }, {
    path: 'view/:id',
    component: ViewComponent,
    data: {
      title: '查看'
    }
  }, {
    path: 'add',
    component: AddComponent,
    data: {
      title: '新增'
    }
  }, {
    path: 'edit/:id',
    component: EditComponent,
    data: {
      title: '编辑'
    }
  }, {
    path: 'audit',
    loadChildren: () => import('./audit/audit.module').then(m => m.AuditModule),
    data: {
      title: '审核'
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule,
    EditModule
  ]
})
export class ActivityRoutingModule {
}
