import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {SignUpComponent} from './sign-up.component';

const routes: Route[] = [
  {
    path: ':id',
    component: SignUpComponent,
    data: {
      title: '报名'
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
export class SignUpRoutingModule {
}
