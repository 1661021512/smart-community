import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContentComponent} from './content.component';

const routes: Routes = [
  {
    path: ':keyword',
    component: ContentComponent,
    data: {
      title: ''
    }
  }, {
    path: ':keyword/:showTitle',
    component: ContentComponent,
    data: {
      title: ''
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
export class ContentRoutingModule {
}
