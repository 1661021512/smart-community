import {ApiInjector, MockApiInterface, RequestOptions} from '@yunzhi/ng-mock-api';
import {HttpParams} from '@angular/common/http';
import {randomNumber, randomString} from '@yunzhi/utils';
import {Page} from '@yunzhi/ng-common';
import {Grider} from '../entity/grider';
import {Town} from '../entity/town';
import {Community} from '../entity/community';
import {District} from '../entity/district';
import {Assert} from '@yunzhi/utils';
import {WebUser} from '../entity/web-user';

/**
 * 网格员管理mockApi
 */
export class GriderApi implements MockApiInterface {
  protected baseUrl = 'grider';

  getInjectors(): ApiInjector[] {
    return [
      {
        url: this.baseUrl + '/existByGriderName',
        description: 'existByGriderName() 判断手机号是否已经在网格员注册',
        result: (urlMatches: any, options: RequestOptions): boolean => {
          const params = options.params as HttpParams;
          console.log('测试params:' + params);
          if (!params.has('griderName')) {
            throw new Error('未接收到查询参数username对应的信息');
          }
          const griderName = params.get('griderName') as string;
          console.log('测试griderName:' + griderName);
          return griderName === '13900000001';
        }
      },
      {
        method: 'GET',
        url: `${this.baseUrl}/getGriderByUserId/(\\d+)`,
        description: 'getGriderByUserId 通过用户id查询网格员表是否已经注册',
        result: (urlMatches: (number)[]) => {
          console.log('测试urlMatches：' + urlMatches[1]);
          let userId = urlMatches[1];
          // 模拟随机返回
          if (userId % 2 == 0) {
            return {
              id: randomNumber(),
              webUser: {
                id: userId
              } as WebUser
            } as Grider;
          } else {
            return null;
          }
        }
      },
      {
        url: this.baseUrl + '/existByUsername',
        description: 'existByUsername() 判断手机号是否已经在网格员表存在',
        result: (urlMatches: any, options: RequestOptions): boolean => {
          const params = options.params as HttpParams;
          if (!params.has('username')) {
            throw new Error('未接收到查询参数username');
          }
          const username = params.get('username') as string;
          if (username === '13912341234') {
            return true;
          } else {
            return null;
          }
        }
      },
      {
        description: 'page 分页',
        url: `${this.baseUrl}/page`,
        result: (urlMatches: any, options: {params: HttpParams;}) => {
          const params = options.params as HttpParams;
          // 前台传入查询条件: name

          const page = +params.get('page');
          const size = +params.get('size');
          // 参数校验
          Assert.isInteger(page, size, 'page size 需为整数');
          // 构建返回数据
          const beginId = page * size;
          const griders = new Array<Grider>();

          for (let i = 0; i < +size; i++) {
            const number = randomNumber(100) + 1;
            griders.push({
              id: beginId + i + 1,
              houseCount: number,
              residentCount: number * 2 + randomNumber(10),
              community: {
                id: randomNumber(),
                name: randomString('社区'),
                pinyin: randomString('pinyin'),
                town: {
                  id: randomNumber(),
                  name: randomString('乡镇'),
                  pinyin: randomString('pinyin'),
                } as Town
              } as Community,
              webUser: {
                id: beginId + i + 1,
                name: randomString('名字'),
                username: '139****0000',
                district: {
                  id: randomNumber(),
                  name: randomString('所属区域'),
                  type: 'town'
                } as District,
                status: randomNumber(2)
              } as WebUser
            } as Grider);
          }
          // 返回了 一个对象
          return {
            content: griders, number: page, size, totalElements: (page + 1) * size + randomNumber(40)
          } as Page<Grider>;
        }
      },
      {
        method: 'POST',
        description: 'save() | 新增网格员人员信息',
        url: this.baseUrl,
        result: (urlMatches: any, options: {
          body: Grider;
        }) => {
          const body = options.body;
          Assert.isDefined(body, body.webUser.id, body.community.id, 'some properties must be set');
          return {} as Grider;
        }
      },
      {
        method: 'DELETE',
        description: 'delete 删除网格员',
        url: `${this.baseUrl}/(\\d+)`
      },
      {
        method: 'GET',
        url: `${this.baseUrl}/(\\d+)`,
        description: 'getById: 获取指定ID的grider',
        result: (urlMatches: Array<string>) => {
          // 使用 + 完成字符串向数字的转换
          const id = +urlMatches[1];
          Assert.isInteger(id, 'id类型必须为number');
          const number = randomNumber(100) + 1;
          const result = {
            id,
            houseCount: number,
            residentCount: number * 2 + randomNumber(10),
            community: {
              id: randomNumber(10),
              name: randomString('社区'),
              pinyin: randomString('pinyin'),
              town: {
                id: randomNumber(),
                name: randomString('乡镇'),
                pinyin: randomString('pinyin'),
              } as Town
            } as Community,
            webUser: {
              id: id,
              name: randomString('名字'),
              username: '13900000000',
              district: {
                id: randomNumber(),
                name: randomString('所属区域'),
                type: 'town'
              } as District,
              status: randomNumber(2)
            } as WebUser,
          } as Grider;
          return result;
        }
      },
      {
        method: 'PUT',
        url: this.baseUrl + '/(\\d+)',
        description: 'update 更新网格员信息'
      }
    ];
  }
}
