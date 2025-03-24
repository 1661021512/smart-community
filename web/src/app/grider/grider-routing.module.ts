import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./index/index.module').then(m => m.IndexModule),
    data: {
      title: ''
    }
  },
  {
    path: 'resident',
    loadChildren: () => import('./resident/resident.module').then(m => m.ResidentModule),
    data: {
      title: '居民管理'
    }
  },
  {
    path: 'house',
    loadChildren: () => import('./house/house.module').then(m => m.HouseModule),
    data: {
      title: '住房管理'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GriderRoutingModule {
}
