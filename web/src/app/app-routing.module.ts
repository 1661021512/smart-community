import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {BasicComponent} from '@yunzhi/ng-theme';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: '',
    component: BasicComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'my-party-building',
        loadChildren: () => import('./my-party-building/my-party-building.module').then(m => m.MyPartyBuildingModule),
        data: {
          title: '我的党建'
        }
      },
      {
        path: 'party-building',
        loadChildren: () => import('./party-building/party-building.module').then(m => m.PartyBuildingModule),
        data: {
          title: '党建管理'
        }
      },
      {
        path: 'covid19',
        loadChildren: () => import('./covid19/covid19.module').then(m => m.Covid19Module),
        data: {
          title: '新冠专项'
        }
      },
      {
        path: 'grider',
        loadChildren: () => import('./grider/grider.module').then(m => m.GriderModule),
        data: {
          title: '网格员管理'
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
      },
      {
        path: 'building',
        loadChildren: () => import('./building/building.module').then(m => m.BuildingModule),
        data: {
          title: '楼栋管理'
        }
      },
      {
        path: 'building-bungalow',
        loadChildren: () => import('./building-bungalow/building-bungalow.module').then(m => m.BuildingBungalowModule),
        data: {
          title: '排管理'
        }
      },
      {
        path: 'community-3d',
        loadChildren: () => import('./community3d/community3d.module').then(m => m.Community3dModule),
        data: {
          title: '社区3D管理'
        }
      },
      {
        path: 'grider',
        loadChildren: () => import('./grider/grider.module').then(m => m.GriderModule),
        data: {
          title: '网格员管理'
        }
      },
      {
        path: 'activity',
        loadChildren: () => import('./activity/activity.module').then(m => m.ActivityModule),
        data: {
          title: '活动管理'
        }
      },
      {
        path: 'community',
        loadChildren: () => import('./community/community.module').then(m => m.CommunityModule),
        data: {
          title: '社区管理'
        }
      },
      {
        path: 'town',
        loadChildren: () => import('./town/town.module').then(m => m.TownModule),
        data: {
          title: '乡镇管理'
        }
      },
      {
        path: 'statistics',
        loadChildren: () => import('./statistics/statistics.module').then(m => m.StatisticsModule),
        data: {
          title: '统计管理'
        }
      },
      {
        path: 'village',
        loadChildren: () => import('./village/village.module').then(m => m.VillageModule),
        data: {
          title: '小区管理'
        },
      },
      {
        path: 'village-bungalow',
        loadChildren: () => import('./village-bungalow/village-bungalow.module').then(m => m.VillageBungalowModule),
        data: {
          title: '片区管理'
        },
      },
      {
        path: 'property',
        loadChildren: () => import('./propertyCompany/property-company.module').then(m => m.PropertyCompanyModule),
        data: {
          title: '物业管理'
        }
      },
      {
        path: 'vehicle',
        loadChildren: () => import('./vehicle/vehicle.module').then(m => m.VehicleModule),
        data: {
          title: '车辆管理'
        }
      },
      {
        path: 'repair',
        loadChildren: () => import('./repair/repair.module').then(m => m.RepairModule),
        data: {
          title: '报修管理'
        }
      },
      {
        path: 'user',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule),
        data: {
          title: '用户管理'
        }
      },
      {
        path: 'volunteer',
        loadChildren: () => import('./volunteer/volunteer.module').then(m => m.VolunteerModule),
        data: {
          title: '志愿者管理'
        }
      },
      {
        path: 'system',
        loadChildren: () => import('./system/system.module').then(m => m.SystemModule),
        data: {
          title: '系统设置'
        }
      },
      {
        path: 'personal-center',
        loadChildren: () => import('./personal/personal.module').then(m => m.PersonalModule),
        data: {
          title: '个人中心'
        }
      },
      {
        path: 'human-resources',
        loadChildren: () => import('./human-resources/human-resources.module').then(m => m.HumanResourcesModule),
        data: {
          title: '人力资源公司'
        }
      },
      {
        path: 'notice',
        loadChildren: () => import('./notice/notice.module').then(m => m.NoticeModule),
        data: {
          title: '通知公告'
        }
      },
      {
        path: 'job',
        loadChildren: () => import('./job/job.module').then(m => m.JobModule),
        data: {
          title: '就业服务'
        }
      }
    ]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
