import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {IndexComponent} from "./index/index.component";
import {EditComponent} from "./edit/edit.component";
import {ViewEnrollmentComponent} from "./view/view-enrollment.component";
import {AddComponent} from "./add/add.component";

const routes: Route[] = [{
  path: '',
  component: IndexComponent,
  data: {
    title: '就业人员管理'
  }
},
  {
    path: 'edit',
    component: EditComponent,
    data: {
      title: '编辑就业人员'
    }
  },
  {
    path: 'view',
    component: ViewEnrollmentComponent,
    data: {
      title: '查看就业人员'
    }
  },
  {
    path: 'add',
    component: AddComponent,
    data: {
      title: '新增就业人员'
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
export class EmployedPersonsRoutingModule {
}
