import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {ResultComponent} from './result.component';

/**
 * 报名结果
 */
const routes: Route[] = [
  {
    path: ':id',
    component: ResultComponent
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
export class ResultRoutingModule {
}
