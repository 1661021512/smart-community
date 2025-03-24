import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from './index/index.component';
import {ViewComponent} from "./view/view.component";

const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'view/:id',
    component: ViewComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepairRoutingModule {
}
