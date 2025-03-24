import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HumanResourcesComponent} from './human-resources.component';

const routes: Routes = [
  {
    path: '',
    component: HumanResourcesComponent,
    data: {}
  }, {
    path: 'content',
    loadChildren: () => import('./../../content/content.module').then(m => m.ContentModule),
    data: {
      title: '',
      description: '人力资源公司相应的子界面'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HumanResourcesRoutingModule {
}
