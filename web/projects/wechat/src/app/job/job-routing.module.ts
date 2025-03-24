import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from './index/index.component';
import {IndexModule} from './index/index.module';
import {ViewComponent} from './view/view.component';
import {ViewModule} from './view/view.module';
import {HumanResourcesModule} from './human-resources/human-resources.module';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'hr-company',
    loadChildren: () => import('./human-resources/human-resources.module').then(m => m.HumanResourcesModule),
    data: {
      title: ''
    }
  },
  {
    path: ':id',
    component: ViewComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    ViewModule,
    HumanResourcesModule,
    IndexModule],
  exports: [RouterModule]
})
export class JobRoutingModule {
}
