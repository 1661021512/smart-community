import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ScheduledComponent} from './scheduled.component';

const routes: Routes = [
  {
    path: '',
    component: ScheduledComponent,
    data: {
      title: ''
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class ScheduledRoutingModule { }
