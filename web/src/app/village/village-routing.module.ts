import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {VillageIndexComponent} from './index/village-index.component';
import {VillageAddComponent} from './add/village-add.component';
import {VillageEditComponent} from './edit/village-edit.component';

const routes: Routes = [
  {
    path: '',
    component: VillageIndexComponent
  },
  {
    path: 'add',
    component: VillageAddComponent
  },
  {
    path: 'edit/:id',
    component: VillageEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VillageRoutingModule {
}
