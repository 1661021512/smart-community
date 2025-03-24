import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {VolunteerStarComponent} from './volunteer-star.component';

const routes: Route[] = [
  {
    path: '',
    component: VolunteerStarComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class VolunteerStarRoutingModule {
}
