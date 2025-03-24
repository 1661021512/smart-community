import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from './index/index.component';
import {ViewComponent} from './notice/view/view.component';
import {ViewModule} from './notice/view/view.module';

/**
 * 匹配顺序由上到下
 */
const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    data: {
      title: ''
    }
  },
  {
    path: 'job',
    loadChildren: () => import('./job/job.module').then(m => m.JobModule),
  },
  {
    path: 'notice',
    loadChildren: () => import('./notice/notice.module').then(m => m.NoticeModule),
  },
  {
    path: 'volunteer',
    loadChildren: () => import('./volunteer/volunteer.module').then(m => m.VolunteerModule),
  },
  {
    path: 'star',
    loadChildren: () => import('./volunteer/volunteer-star/volunteer-star.module').then(m => m.VolunteerStarModule),
  },
  {
    path: ':id',
    component: ViewComponent,
    data: {
      title: ''
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    ViewModule],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
