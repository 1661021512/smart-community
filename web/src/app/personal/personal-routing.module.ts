import {RouterModule, Routes} from '@angular/router';
import {PersonalComponent} from './personal.component';
import {NgModule} from '@angular/core';
import {ModifyPasswordComponent} from './modify-password/modify-password.component';

const routes: Routes = [
  {
    path: '',
    component: PersonalComponent,
    data: {
      title: ''
    }
  },
  {
    path: 'modifyPassword',
    component: ModifyPasswordComponent,
    data: {
      title: '修改密码'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalRoutingModule {
}
