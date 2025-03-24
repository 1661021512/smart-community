import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from './index/index.component';
import {AddComponent} from './add/add.component';
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
    path: 'add/:dutyId',
    component: AddComponent,
    data: {
      title: '设置'
    }
  },
  {
    path: 'edit/:id',
    component: EditComponent,
    data: {
      title: '设置'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartyBuildingRoutingModule {
}
