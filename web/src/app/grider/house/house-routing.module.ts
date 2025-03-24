import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HouseComponent} from './house.component';
import {ViewComponent} from './view/view.component';
import {EditComponent} from './edit/edit.component';
import {AddResidentComponent} from './add-resident/add-resident.component';

const routes: Routes = [
  {
    path: '',
    component: HouseComponent,
    data: {
      title: ''
    }
  }, {
    path: 'detail/:id',
    component: ViewComponent,
    data: {
      title: '详情'
    }
  }, {
    path: 'edit/:id',
    component: EditComponent,
    data: {
      title: '编辑'
    }
  }, {
    path: 'addResident/:houseId',
    component: AddResidentComponent,
    data: {
      title: '添加居民'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HouseRoutingModule {
}
