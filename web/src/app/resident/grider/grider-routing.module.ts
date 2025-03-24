import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';

const routers: Route[] = [];

@NgModule({
  imports: [RouterModule.forChild(routers)],
  exports: [RouterModule]
})
export class GriderRoutingModule {
}
