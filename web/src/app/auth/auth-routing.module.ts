import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ShangyiComponent} from './shangyi/shangyi.component';
import {LoginComponent as ShangyiLoginComponent} from './shangyi/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: ShangyiComponent,
    children: [{
      path: '',
      component: ShangyiLoginComponent,
    }]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
