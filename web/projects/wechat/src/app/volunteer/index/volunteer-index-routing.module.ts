import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {VolunteerIndexComponent} from './volunteer-index.component';

const routes: Route[] = [
  {
    path: '',
    component: VolunteerIndexComponent,
    data: {
      title: {
        data: '志愿者'
      }
    }
  }, {
    path: 'content',
    loadChildren: () => import('./../../content/content.module').then(m => m.ContentModule)
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
export class VolunteerIndexRoutingModule {
}
