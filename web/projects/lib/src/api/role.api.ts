import {ApiInjector, Assert, MockApiInterface} from '@yunzhi/ng-mock-api';
import {Role} from '../entity/role';
import {HttpParams} from '@angular/common/http';
import {randomBoolean, randomNumber, randomString} from '@yunzhi/utils';
import {Page} from '@yunzhi/ng-common';

/**
 * 角色管理mockApi
 */
export class RoleApi implements MockApiInterface {
  private baseUrl = 'role';

  getInjectors(): ApiInjector[] {
    return [

      // 分页查询
      {
        method: 'GET',
        url: `${this.baseUrl}/page`,
        result: (urlMatches: any, options: { params: HttpParams; }) => {
          const params = options.params as HttpParams;
          const page = +params.get('page');
          const size = +params.get('size');
          // 参数校验
          Assert.isNotNullOrUndefined(page, size, self.name +' page,size为必选');
          Assert.isDefined(params.get('name'), self.name +' 选填参数未添加全');

          // 构建返回数据
          const beginId = page * size;
          const roles = new Array<Role>();
          for (let i = 0; i < +size; i++) {
            roles.push({
              id: beginId + i,
              name: randomString('超级管理员'),
              weight: randomNumber(),
              systemed: randomBoolean(),
              value: randomString(),
            } as Role);
          }
          // 返回了 一个对象
          return {
            content: roles, number: page, size, totalElements: 40 + randomNumber()
          } as Page<Role>;
        }
      },


      // 根据id获取角色管理api @Author duangshuangyu
      {
        method: 'GET',
        url: `${this.baseUrl}/(\\d+)`,
        result: (urlMatches: Array<string>) => {
          // 使用 + 完成字符串向数字的转换
          const id = +urlMatches[1];
          Assert.isNumber(id, 'id类型必须为number');
          return {
            id: id,
            name: randomString('超级管理员'),
            weight: randomNumber()
          } as Role;
        }
      },
      // 修改角色管理 @Author duangshuangyu
      {
        method: 'PUT',
        url: `${this.baseUrl}/(\\d+)`,
        result: (urlMatches: (string)[], option: { body: { id: number, name: string, weight: number }; }) => {
          let body = {} as { id: number, name: string, weight: number };
          let id;

          console.log('进入api的update...');

          if (urlMatches) {
            // 使用 + 完成字符串向数字的转换
            id = +urlMatches[1];
          }

          if (option) {
            body = option.body;
          }


          Assert.isNumber(id, 'id must be set');
          Assert.isString(body.name, 'name must be set');
          Assert.isNumber(body.weight, 'weight must be set');

          return {
            id: body.id,
            name: body.name,
            weight: body.weight
          } as Role;
        }
      },
      // 新增角色
      {
        method: 'POST',
        url: this.baseUrl,
        description: '新增角色',
        result: (urlMatches: any, option: { body: { name: string, weight: number, value: string }; }) => {
          let body = option.body as { name: string, weight: number, value: string };
          Assert.isString(body.name, 'type of town name must be string');
          Assert.isNumber(body.weight, 'type of town weight must be number');
          Assert.isString(body.value, 'type of town name must be string');

          return {
            id: randomNumber(),
            name: body.name,
            weight: body.weight,
            value: body.value
          } as Role
        }
      },
      /**
       * 获取所有角色
       */
      {
        method: 'GET',
        url: `${this.baseUrl}`,
        result: () => {
          const roles = [] as Role[];
          for (let i = 0; i < 5; i++) {
            roles.push(
              {
                id: i,
                name: randomString('name', 2),
                weight: i,
              } as Role
            )
          }
          return roles;
        }
      },
    ]
  }
}
