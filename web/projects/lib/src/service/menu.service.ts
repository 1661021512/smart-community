import {Injectable} from '@angular/core';
import {Observable, Subscriber} from 'rxjs';
import {WebUserService} from '../../../../src/service/web-user.service';
import {ROLE_TYPE} from '../entity/enum/role-type';
import {Menu} from '../entity/menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private static readonly menus = [
    {
      name: '首页',
      url: 'dashboard',
      icon: 'fa fa-tachometer-alt',
      roles: [ROLE_TYPE.user.value, ROLE_TYPE.admin.value, ROLE_TYPE.grider.value]
    },
    {
      name: '我的党建',
      url: 'my-party-building',
      icon: 'fa fa-handshake',
      roles: [ROLE_TYPE.user.value, ROLE_TYPE.admin.value]
    },
    {
      name: '党建管理',
      url: 'party-building',
      icon: 'fa fa-handshake',
      roles: [ROLE_TYPE.user.value, ROLE_TYPE.admin.value]
    },
    {
      name: '新冠专项',
      url: 'covid19',
      icon: 'fa fa-medkit',
      roles: [ROLE_TYPE.user.value, ROLE_TYPE.admin.value]
    },
    {
      name: '网格员管理',
      url: 'grider',
      icon: 'fa fa-handshake',
      roles: [ROLE_TYPE.user.value]
    },
    {
      name: '居民管理',
      url: 'resident',
      icon: 'fa fa-user-cog',
      roles: [ROLE_TYPE.user.value]
    },
    {
      name: '居民管理',
      url: 'grider/resident',
      icon: 'fa fa-user-cog',
      roles: [ROLE_TYPE.grider.value]
    },
    {
      name: '住房管理',
      url: 'house',
      icon: 'fa fa-laptop-house',
      roles: [ROLE_TYPE.user.value, ROLE_TYPE.admin.value]
    },
    {
      name: '住房管理',
      url: 'grider/house',
      icon: 'fa fa-laptop-house',
      roles: [ROLE_TYPE.grider.value]
    },
    {
      name: '楼栋管理',
      url: 'building',
      icon: 'fa fa-house-user',
      roles: [ROLE_TYPE.user.value, ROLE_TYPE.admin.value]
    },
    {
      name: '排管理',
      url: 'building-bungalow',
      icon: 'fa fa-house-user',
      roles: [ROLE_TYPE.user.value, ROLE_TYPE.admin.value]
    },
    {
      name: '小区管理',
      url: 'village',
      icon: 'fa fa-building',
      roles: [ROLE_TYPE.user.value, ROLE_TYPE.admin.value]
    },
    {
      name: '片区管理',
      url: 'village-bungalow',
      icon: 'fa fa-building',
      roles: [ROLE_TYPE.user.value, ROLE_TYPE.admin.value]
    },
    {
      name: '社区管理',
      url: 'community',
      icon: 'fa fa-city',
      roles: [ROLE_TYPE.admin.value]
    },
    {
      name: '乡镇管理',
      url: 'town',
      icon: 'fa fa-home',
      roles: [ROLE_TYPE.admin.value]
    },
    {
      name: '统计管理',
      url: 'statistics',
      icon: 'fas fa-stream',
      roles: [ROLE_TYPE.admin.value]
    },
    {
      name: '用户管理',
      url: 'user',
      icon: 'fa fa-user-lock',
      roles: [ROLE_TYPE.admin.value]
    },
    {
      name: '通知公告',
      url: 'notice',
      icon: 'fa fa-flag',
      roles: [ROLE_TYPE.admin.value]
    },
    {
      name: '人力资源公司',
      url: 'human-resources',
      icon: 'fa fa-building',
      roles: [ROLE_TYPE.admin.value],
      children: [
        {
          name: '人力资源公司',
          url: 'index',
          icon: 'fa fa-building',
          roles: [ROLE_TYPE.admin.value],
        },
        {
          name: '劳务派遣',
          url: 'labor-dispatch',
          icon: 'fa fa-user-tie',
          roles: [ROLE_TYPE.admin.value]
        },
        {
          name: '技能培训',
          url: 'skill-training',
          icon: 'fa fa-hammer',
          roles: [ROLE_TYPE.admin.value]
        },
        {
          name: '猎头服务',
          url: 'headhunting-service',
          icon: 'fa fa-tasks',
          roles: [ROLE_TYPE.admin.value]
        },
        {
          name: '代理招聘',
          url: 'job-agent',
          icon: 'fa fa-address-book',
          roles: [ROLE_TYPE.admin.value]
        },
        {
          name: '政企对接',
          url: 'government-and-enterprise',
          icon: 'fa fa-university',
          roles: [ROLE_TYPE.admin.value]
        },
        {
          name: '企业对接',
          url: 'enterprise',
          icon: 'fa fa-hand-rock',
          roles: [ROLE_TYPE.admin.value]
        },
      ]
    },
    {
      name: '社区企业',
      url: 'todo',
      icon: 'fa fa-university',
      roles: [ROLE_TYPE.volunteer.value, ROLE_TYPE.admin.value],
      children: [
        {
          name: '草莓加工厂',
          url: 'todo',
          icon: 'fa fa-truck',
          roles: [ROLE_TYPE.volunteer.value, ROLE_TYPE.admin.value]
        }
      ]
    },
    {
      name: '社区微工厂',
      url: 'todo',
      icon: 'fa fa-cogs',
      roles: [ROLE_TYPE.volunteer.value, ROLE_TYPE.admin.value],
      children: [
        {
          name: '手工缝纫',
          url: 'todo',
          icon: 'fa fa-hand-scissors',
          roles: [ROLE_TYPE.volunteer.value, ROLE_TYPE.admin.value]
        },
        {
          name: '杂粮包装',
          url: 'todo',
          icon: 'fa fa-shopping-basket',
          roles: [ROLE_TYPE.volunteer.value, ROLE_TYPE.admin.value]
        },
        {
          name: '假花加工',
          url: 'todo',
          icon: 'fa fa-certificate',
          roles: [ROLE_TYPE.volunteer.value, ROLE_TYPE.admin.value]
        }
      ]
    },
    {
      name: '志愿者服务',
      url: 'volunteer',
      icon: 'fa fa-user-lock',
      roles: [ROLE_TYPE.volunteer.value, ROLE_TYPE.admin.value],
      beAbstract: true,
      children: [
        {
          name: '志愿者管理',
          url: 'volunteer',
          icon: 'fa fa-user-lock',
          roles: [ROLE_TYPE.volunteer.value, ROLE_TYPE.admin.value]
        },
        {
          name: '活动管理',
          url: 'activity',
          icon: 'fa fa-user-lock',
          roles: [ROLE_TYPE.volunteer.value, ROLE_TYPE.admin.value]
        },
        {
          name: '协会管理',
          url: 'association',
          icon: 'fa fa-user-lock',
          roles: [ROLE_TYPE.volunteer.value, ROLE_TYPE.admin.value]
        }
      ]
    },
    {
      name: '系统设置',
      url: 'system',
      icon: 'fa fa-plus-square',
      roles: [ROLE_TYPE.admin.value],
      beAbstract: true,
      children: [
        {
          name: '居民间关系',
          url: 'relationship',
          icon: 'fa fa-user-friends',
          roles: [ROLE_TYPE.admin.value]
        },
        {
          name: '角色管理',
          url: 'role',
          icon: 'fa fa-user-friends',
          roles: [ROLE_TYPE.admin.value]
        },
        {
          name: '职位管理',
          url: 'duty',
          icon: 'fa fa-user-friends',
          roles: [ROLE_TYPE.admin.value]
        }, {
          name: '车辆类型管理',
          url: 'vehicleType',
          icon: 'fa fa-car-side',
          roles: [ROLE_TYPE.admin.value]
        },
        {
          name: '车辆品牌管理',
          url: 'vehicleBrand',
          icon: 'fa fa-car',
          roles: [ROLE_TYPE.admin.value]
        }, {
          name: '地图设置',
          url: 'map',
          icon: 'fa fa-map',
          roles: [ROLE_TYPE.admin.value]
        }, {
          name: '统计数据',
          url: 'scheduled',
          icon: 'fa fa-chart-bar',
          roles: [ROLE_TYPE.admin.value]
        }
      ]
    },
    {
      name: '个人中心',
      url: 'personal-center',
      icon: 'fa fa-user-alt',
      roles: [ROLE_TYPE.user.value, ROLE_TYPE.admin.value, ROLE_TYPE.grider.value]
    },
    {
      name: '社区3D管理',
      url: 'community-3d',
      icon: 'fas fa-cubes',
      roles: [ROLE_TYPE.admin.value]
    },
    {
      name: '活动管理',
      url: 'activity',
      icon: 'fas fa-people-arrows',
      roles: [ROLE_TYPE.admin.value]
    },
    {
      name: '物业管理',
      url: 'property',
      icon: 'fa fa-gopuram',
      roles: [ROLE_TYPE.admin.value]
    },
    {
      name: '车辆管理',
      url: 'vehicle',
      icon: 'fas fa-car-side',
      roles: [ROLE_TYPE.admin.value]
    },
    {
      name: '报修管理',
      url: 'repair',
      icon: 'fas fa-tools',
      roles: [ROLE_TYPE.admin.value]
    },
    {
      name: '就业服务',
      url: 'job',
      icon: 'fa fa-flag',
      roles: [ROLE_TYPE.admin.value],
      beAbstract: false,
      children: [
        {
          name: '公益性岗位',
          url: 'welfare-job',
          icon: 'fa fa-user',
          roles: [ROLE_TYPE.volunteer.value, ROLE_TYPE.admin.value]
        },
        {
          name: '就业人员',
          url: 'employed-persons',
          icon: 'fa fa-user',
          roles: [ROLE_TYPE.volunteer.value, ROLE_TYPE.admin.value]
        }
      ]
    },
  ] as Menu[];

  constructor(private userService: WebUserService) {
  }

  public getMenus(): Observable<Menu[]> {
    let subscribe: Subscriber<Menu[]>;
    return new Observable<Menu[]>(s => {
      subscribe = s;
      this.userService.currentLoginUser$.subscribe(
        user => {
          const roleKeys = user ? user.roles.map(role => role.value) : [];
          subscribe.next(
            MenuService.menus.filter(menu => {
              const menuRoleKeys = menu.roles;
              let found = false;
              menuRoleKeys.forEach(roleKey => {
                if (!found && (roleKeys.indexOf(roleKey) !== -1)) {
                  found = true;
                }
              });
              return found;
            })
          );
        }
      );
    });
  }
}
