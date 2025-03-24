import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {VolunteerComponent} from './volunteer.component';
import {ContentComponent} from '../content/content.component';
import {CONTENT_KEYWORD} from '../../../projects/lib/src/enum/content-keyword';

const routes: Route[] = [
  {
    path: 'volunteer',
    component: VolunteerComponent,
    data: {
      title: ''
    }
  }, {
    path: 'activity',
    loadChildren: () => import('./activity/activity.module').then(m => m.ActivityModule),
    data: {
      title: '活动管理'
    }
  }, {
    path: 'association',
    component: ContentComponent,
    data: {
      title: '志愿者协会',
      content: {
        keyword: CONTENT_KEYWORD.volunteerAssociation.value,
        title: CONTENT_KEYWORD.volunteerAssociation.description
      }
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
export class VolunteerRoutingModule {
}
