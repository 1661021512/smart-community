import {ApiInjector, MockApiInterface} from '@yunzhi/ng-mock-api';
import {Relationship} from '../entity/relationship';
import {HttpParams} from '@angular/common/http';
import {Assert, randomBoolean, randomNumber, randomString} from '@yunzhi/utils';
import {Page} from '@yunzhi/ng-common';

/**
 * 居民关系管理mockApi
 */
export class RelationshipApi implements MockApiInterface {
  private name = 'RelationshipApi: ';
  private baseUrl = 'relationship';

  getInjectors(): ApiInjector[] {
    return [
      {
        method: 'GET',
        url: `${this.baseUrl}/page`,
        description: 'page: 分页查询',
        result: (urlMatches: any, options: {params: HttpParams;}) => {
          const params = options.params as HttpParams;
          console.log('接受的参数为：', params);
          const page = +params.get('page');
          const size = +params.get('size');
          // 参数校验
          Assert.isNotNullOrUndefined(page, size, self.name +' page,size为必选');
          Assert.isDefined(params.get('name'), self.name +' 选填参数未添加全');

          // 构建返回数据
          const beginId = page * size;
          const relationships = new Array<Relationship>();
          for (let i = 0; i < +size; i++) {
            relationships.push({
              id: beginId + i,
              name: randomString('关系'),
              weight: randomNumber(),
            } as Relationship);
          }
          // 返回了 一个对象
          return {
            content: relationships, number: page, size, totalElements: 40 + randomNumber()
          } as Page<Relationship>;
        }
      },
      {
        method: 'POST',
        url: this.baseUrl,
        description: 'save: 新增居民关系',
        result: (urlMatches: any, option: {body: {name: string, weight: number};}) => {
          let body = option.body;
          return {...body, ...{id: randomNumber()}}
        }
      },
      {
        method: 'GET',
        url: `${this.baseUrl}/(\\d+)`,
        description: 'getById: 根据id获取居民关系',
        result: (urlMatches: Array<string>) => {
          // 使用 + 完成字符串向数字的转换
          const id = +urlMatches[1];
          Assert.isNumber(id, 'id类型必须为number');
          return {
            id: id,
            name: randomString('居民关系'),
            weight: randomNumber()
          } as Relationship;
        }
      },
      {
        method: 'PUT',
        url: `${this.baseUrl}/(\\d+)`,
        description: 'update: 修改居民关系',
        result: (urlMatches: (string)[], option: {body: {id: number, name: string, weight: number};}) => {
          let body = {} as {id: number, name: string, weight: number};
          let id;

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
          } as Relationship;
        }
      },
      {
        method: 'DELETE',
        url: `${this.baseUrl}/(\\d+)`,
        description: 'deleteById: 删除居民关系'
      },
      {
        method: 'PUT',
        url: `${this.baseUrl}/updateBetweenTwoResidents`,
        description: '更新两个居民的关系，虽然该方法位于relationship中，但实际上并不是操作的relationship表。' +
          '实际操作的应该是后台的 居民间关系 表。' +
          '只所以写在这，是由于前台的思索定式。' +
          '由于关系是双向的，所以这个API有点坑，实现思路如下：' +
          '1. 数据校验' +
          '2. 居民1ID + 居民2ID去查表' +
          '3. 未查到，则新建；查的到，更新其关系ID' +
          '4. 继续与居民2ID,居民1ID去查看' +
          '5. 未查到，则新建；查的到，更新其关系ID',
        result: (matchers: any, options: {
          body: {
            relationshipId: number,
            oneResidentId: number,
            anotherResidentId: number
          }
        }) => {
          const body = options.body;
          Assert.isDefined(body, '未获取到请求主体');
          Assert.isNumber(body.relationshipId, body.oneResidentId, body.anotherResidentId, '主体数据格式不正确');
          return;
        }
      },
      {
        method: 'GET',
        url: `${this.baseUrl}`,
        description: 'getAll: 获取所有居民关系',
        result: () => {
          const relationships = new Array<Relationship>();
          for (let i = 0; i < 10; i++) {
            relationships.push({
              id: i,
              name: randomString('居民关系'),
              weight: i,
            } as Relationship);
          }
          return relationships;
        },
      },
      {
        method: 'GET',
        url: this.baseUrl + `/getByResidentIds`,
        description: 'getByResidentIds: 获取两个居民间的关系.' +
          '1. 此方法实际上查询的是居民间关系表（并不是居民关系）' +
          '2. 如果找到两个居民的关系，则返回' +
          '3. 如果没有找到，则返回null' +
          '本接口模拟返回一个固定的值，就是由于Angular在调用管道时需要一个稳定的值的原因',
        result: (urlMatchers: string[], options: {params: HttpParams}) => {
          const params = options.params;
          Assert.isTrue(params.has('oneRelationId'), params.has('anotherRelationId'),
            this.name + '居民ID校验异常');

          if (randomBoolean()) {
            return null;
          } else {
            return {name: randomString('居民关系')} as Relationship
          }
        }
      }
    ]
  }
}
