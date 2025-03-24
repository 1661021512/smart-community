import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ViewComponent} from "./view/view.component";
import {EditComponent} from "./edit/edit.component";
import {IndexComponent} from "./index/index.component";
import {AddComponent} from "./add/add.component";

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    data: {
      title: ''
    }
  },
  {
    path: 'view/:id',
    component: ViewComponent,
    data: {
      title: '查看公告'
    }
  },
  {
    path: 'edit/:id',
    component: EditComponent,
    data: {
      title: '修改公告'
    }
  },

  {
    path: 'add',
    component: AddComponent,
    data: {
      title: '新增公告'
    }
  },

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoticeRoutingModule { }
