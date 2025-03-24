import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {ActivityDetailsComponent} from './activity-details.component';

const routes: Route[] = [
  {
    path: ':id',
    component: ActivityDetailsComponent,
    data: {
      title: '活动详情'
    }
  },
  {
    path: ':id/signUp',
    loadChildren: () => import('./sign-up/sign-up.module').then(m => m.SignUpModule),
    data: {
      title: '报名'
    }
  },
  {
    path: ':id/result',
    loadChildren: () => import('./result/result.module').then(m => m.ResultModule),
    data: {
      title: '志愿活动报名结果'
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
export class ActivityDetailsRoutingModule {

}
