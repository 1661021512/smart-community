import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MyPartyBuildingComponent} from './my-party-building.component';

const routes: Routes = [
  {
    path: '',
    component: MyPartyBuildingComponent,
    data: {
      title: ''
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyPartyBuildingRoutingModule { }
