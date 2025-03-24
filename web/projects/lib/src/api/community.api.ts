import {ApiInjector, MockApiInterface, RequestOptions} from '@yunzhi/ng-mock-api';
import {Assert, randomNumber, randomString} from '@yunzhi/utils';
import {HttpParams} from '@angular/common/http';
import {Town} from '../entity/town';
import {Community} from '../entity/community';
import {Page} from '@yunzhi/ng-common';

/**
 * 社区管理mockApi
 */
export class CommunityApi implements MockApiInterface {
  private url = 'community';

  getInjectors(): ApiInjector[] {
    return [
      {
        url: `${this.url}/(\\d+)`,
        description: '根据id获取社区api',
        method: 'GET',
        result: (urlMatches: (string)[]) => {
          let id;
          if (urlMatches) {
            id = +urlMatches[1];
          }
          return {
            id: id,
            name: randomString('社区'),
            pinyin: randomString('pinyin'),
            town: {
              id: randomNumber(),
              name: randomString('乡镇'),
              pinyin: randomString('pinyin'),
            } as Town
          } as Community;
        }
      },
      // 新增社区
      {
        method: 'POST',
        url: this.url,
        result: (urlMatches: any, options: { body: { name: string, pinyin: string, town: Town }; }) => {
          let body = {} as { name: string, pinyin: string, town: Town };

          if (options) {
            body = options.body;
          }

          return {
            id: randomNumber(),
            name: body.name,
            pinyin: body.pinyin,
            town: body.town
          } as Community;
        }
      },
      // 修改社区
      {
        method: 'PUT',
        url: `${this.url}/(\\d+)`,
        result: (urlMatches: (string)[], options: { body: { id: number, name: string, pinyin: string, town: Town }; }) => {
          let body = {} as { id: number, name: string, pinyin: string, town: Town };
          let id;
          if (urlMatches) {
            id = +urlMatches[1];
          }

          if (options) {
            body = options.body;
          }

          Assert.isString(body.name, 'name must be set');
          Assert.isString(body.pinyin, 'pinyin must be set');
          Assert.isNumber(body.town.id, 'townId must be set');

          return {
            id,
            name: body.name,
            pinyin: body.pinyin,
            town: body.town,
          } as Community;
        }
      },
      // 分页查询
      {
        method: 'GET',
        url: `${this.url}/page`,
        result: (urlMatches: any, options: { params: HttpParams; }) => {
          const params = options.params as HttpParams;
          console.log('接受的参数为：', params);
          const page = +params.get('page');
          const size = +params.get('size');
          // 参数校验
          Assert.isNotNullOrUndefined(page, size, self.name + ' page,size为必选');
          Assert.isDefined(params.get('name'), self.name + ' 选填参数未添加全');

          // 构建返回数据
          const beginId = page * size;
          const communities = new Array<Community>();
          for (let i = 0; i < +size; i++) {
            const town = {
              id: randomNumber(),
              name: randomString('乡镇'),
              pinyin: randomString('pinyin'),
            } as Town;
            communities.push({
              id: beginId + i,
              name: randomString('社区'),
              pinyin: randomString('pinyin'),
              town,
            } as Community);
          }
          return {
            content: communities, number: page, size, totalElements: 40 + randomNumber()
          } as Page<Community>;
        }
      },
      // 删除社区
      {
        method: 'DELETE',
        url: `${this.url}/(\\d+)`,
      },
      // 获取所有社区
      {
        method: 'GET',
        url: `${this.url}/getAll`,
        result: () => {
          const communities = new Array<Community>();
          for (let i = 0; i < 10; i++) {
            communities.push({
              id: i,
              name: randomString('社区'),
              town: {
                id: randomNumber(10),
                name: randomString('乡镇'),
                pinyin: randomString('pinyin'),
              } as Town,
            } as Community);
          }
          return communities;
        },
      },
      // 根据乡镇Id获取社区
      {
        method: 'GET',
        url: `${this.url}/getByTownId/(\\d+)`,
        result: (urlMatches: Array<string>) => {
          const townId = +urlMatches[1];
          Assert.isNumber(townId, 'townId must be number');
          let communities = new Array<Community>();
          for (let i = 0 ; i < 10 ; i++)
          {
            communities.push({
               id: i,
               name: randomString('社区')
             }as Community)
          }
          return communities ;
        }
      },
      {
        url: this.url + '/existByName',
        description:'判断社区名称是否存在',
        result: ((urlMatches: any, option: RequestOptions): boolean => {
          const params = option.params as HttpParams;
          Assert.isTrue(params.has('name'), 'name must be set');
          if (!params.has('name')) {
            throw new Error('未接收到查询参数name');
          }
          const name = params.get('name') as string;
          if (name === '社区') {  //“社区”模拟对应后台已有的社区名称
            return true;
          } else {
            return false;
          }
        })
      },
    ];
  }
}

