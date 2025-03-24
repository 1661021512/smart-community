import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {WelfareJobComponent} from "./welfare-job.component";
import {AddComponent} from "./add/add.component";
import {EditComponent} from "./edit/edit.component";
import {ViewComponent} from "./view/view.component";

const routes: Route[] = [
  {
    path: 'view',
    component: ViewComponent,
    data: {
      title: '查看公益性岗位'
    }
  },
  {
    path: 'edit',
    component: EditComponent,
    data: {
      title: '编辑公益性岗位'
    }
  },
  {
    path: 'add',
    component: AddComponent,
    data: {
      title: '新增公益性岗位'
    }
  },
  {
    path: '',
    component: WelfareJobComponent,
    data: {
      title: '公益性岗位'
    }
  }];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class WelfareJobRoutingModule {
}
