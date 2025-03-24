import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IndexComponent} from "../house/index/index.component";
import {ThreeComponent} from "./index/three.component";

const routes: Routes = [
  {
    path: '',
    component: ThreeComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThreeModelRoutingModule { }
