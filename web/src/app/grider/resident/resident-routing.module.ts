import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {ResidentComponent} from './resident.component';
import {ViewComponent} from './view/view.component';
import {EditComponent} from './edit/edit.component';

const routes: Route[] = [
  {
    path: '',
    component: ResidentComponent,
    data: {
      title: ''
    }
  },
  {
    path: 'view/:id',
    component: ViewComponent,
    data: {
      title: ''
    }
  }, {
    path: 'edit/:id',
    component: EditComponent,
    data: {
      title: ''
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResidentRoutingModule {
}
