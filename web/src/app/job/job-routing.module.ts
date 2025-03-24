import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';

const routes: Route[] = [
  {
    path: '',
    loadChildren: () => import('./job-job/job-job.module').then(m => m.JobJobModule),
    data: {
      title: '招聘咨询'
    }
  },
  {
    path: 'employed-persons',
    loadChildren: () => import('./employed-persons/employed-persons.module').then(m => m.EmployedPersonsModule),
    data: {
      title: '就业人员'
    }
  }, {
    path: 'recruitment-information',
    loadChildren: () => import('./job-job/job-job.module').then(m => m.JobJobModule),
    data: {
      title: '招聘咨询'
    }
  },
  {
    path: 'welfare-job',
    loadChildren: () => import('./welfare-job/welfare-job.module').then(m => m.WelfareJobModule),
    data: {
      title: '公益性岗位'
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
export class JobRoutingModule {
}
