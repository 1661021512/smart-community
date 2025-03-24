import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./index/volunteer-index.module').then(m => m.VolunteerIndexModule)
  },
  {
    path: 'detail',
    loadChildren: () => import('./activity-details/activity-details.module').then(m => m.ActivityDetailsModule),
    data: {
      title: '志愿活动详细',
      todo: 'todo'
    }
  },
  {
    path: 'star',
    loadChildren: () => import('./volunteer-star/volunteer-star.module').then(m => m.VolunteerStarModule),
    data: {
      title: '志愿明星',
    }
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class VolunteerRoutingModule {
}
