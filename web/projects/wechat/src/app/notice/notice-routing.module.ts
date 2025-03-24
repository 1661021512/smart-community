import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ViewModule} from './view/view.module';
import {IndexComponent} from './index/index.component';
import {IndexModule} from './index/index.module';
import {ViewComponent} from './view/view.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: ':id',
    component: ViewComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes),
    ViewModule,
    IndexModule],
  exports: [RouterModule]
})
export class NoticeRoutingModule {
}
