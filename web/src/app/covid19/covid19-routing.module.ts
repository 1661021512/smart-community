import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {IndexComponent} from './index/index.component';

const routes: Route[] = [{
  path: '',
  component: IndexComponent,
  data: {}
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class Covid19RoutingModule {
}
