import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'role',
    loadChildren: () => import('./role/role.module').then(m => m.RoleModule),
    data: {
      title: '角色管理'
    }
  },
  {
    path: 'relationship',
    loadChildren: () => import('./relationship/relationship.module').then(m => m.RelationshipModule),
    data: {
      title: '居民关系管理'
    }
  },
  {
    path: 'duty',
    loadChildren: () => import('./duty/duty.module').then(m => m.DutyModule),
    data: {
      title: '职位管理'
    }
  },
  {
    path: 'map',
    loadChildren: () => import('./map/map.module').then(m => m.MapModule),
    data: {
      title: '地图设置'
    }
  }, {
    path: 'scheduled',
    loadChildren: () => import('./scheduled/scheduled.module').then(m => m.ScheduledModule),
    data: {
      title: '调度触发'
    }
  }, {
    path: 'vehicleType',
    loadChildren: () => import('./vehicle-type/vehicle-type.module').then(m => m.VehicleTypeModule),
    data: {
      title: '车辆类型'
    }
  }, {
    path: 'vehicleBrand',
    loadChildren: () => import('./vehicle-brand/vehicle-brand.module').then(m => m.VehicleBrandModule),
    data: {
      title: '车辆品牌'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule {
}
