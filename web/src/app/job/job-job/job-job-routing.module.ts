import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {IndexComponent} from './index/index.component';
import {EditComponent} from './edit/edit.component';
import {AddComponent} from './add/add.component';
import {EditModule} from './edit/edit.module';
import {AddModule} from './add/add.module';
import {IndexModule} from './index/index.module';

const routes: Route[] = [
  {
    path: '',
    component: IndexComponent,
    data: {
      title: '就业服务'
    }
  }, {
    path: 'edit/:id',
    component: EditComponent,
    data: {
      title: '编辑'
    }
  }, {
    path: 'add',
    component: AddComponent,
    data: {
      title: '新增'
    }
  }];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    EditModule,
    AddModule,
    IndexModule,
  ],
  exports: [
    RouterModule
  ]
})
export class JobJobRoutingModule {
}
