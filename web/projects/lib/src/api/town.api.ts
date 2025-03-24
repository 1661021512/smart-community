import {ApiInjector, Assert, MockApiInterface, RequestOptions} from '@yunzhi/ng-mock-api';
import {Town} from '../entity/town';
import {HttpParams} from '@angular/common/http';
import {randomNumber, randomString} from '@yunzhi/utils';
import {Page} from '@yunzhi/ng-common';

/**
 * 乡镇管理mockApi
 */
export class TownApi implements MockApiInterface {
  protected baseUrl = 'town';

  getInjectors(): ApiInjector[] {
    return [
      // 获取所有乡镇
      {
        method: 'GET',
        url: `${this.baseUrl}`,
        description: 'getAll',
        result: () => {
          const towns = new Array<Town>();
          const num = 10;
          const townNames = [
            '八道沟镇',
            '大青沟镇',
            '红土梁镇',
            '满井镇',
            '南壕堑镇',
            '三工地镇',
            '小蒜沟镇',
            '大苏计乡',
            '大营盘乡',
            '甲石河乡',
            '七甲乡',
            '石井乡',
            '套里庄乡',
            '下马圈乡'];

          for (let i = 0; i < num; i++) {
            towns.push({
              id: i,
              name: townNames[i],
              pinyin: randomString('pinyin'),
            } as Town);
          }
          return towns;
        }
      },
      {
        method: 'GET',
        url: `${this.baseUrl}/page`,
        result: (urlMatches: any, options: {params: HttpParams;}) => {
          const params = options.params as HttpParams;
          console.log('接受的参数为：', params);
          const page = +params.get('page');
          const size = +params.get('size');
          // 参数校验
          Assert.isNotNullOrUndefined(page, size, 'page,size为必选');
          Assert.isDefined(params.get('name'), self.name + ' 选填参数未添加全');

          // 构建返回数据
          const beginId = page * size;
          const towns = new Array<Town>();
          for (let i = 0; i < +size; i++) {
            towns.push({
              id: beginId + i,
              name: randomString('乡镇'),
              pinyin: randomString('pinyin'),
            } as Town);
          }
          // 返回了 一个对象
          return {
            content: towns, number: page, size, totalElements: 40 + randomNumber()
          } as Page<Town>;
        }
      },
      // 新增乡镇
      {
        method: 'POST',
        url: this.baseUrl,
        result: (urlMatches: any, option: {body: {name: string, pinyin: string};}) => {
          let body = {} as {name: string, pinyin: string};

          if (option) {
            body = option.body;
          }

          return {
            id: randomNumber(),
            name: body.name,
            pinyin: body.pinyin
          } as Town;
        }
      },
      // 根据ID获取乡镇
      {
        method: 'GET',
        url: `${this.baseUrl}/(\\d+)`,
        result: (urlMatches: Array<string>) => {
          // 使用 + 完成字符串向数字的转换
          const id = +urlMatches[1];
          Assert.isNumber(id, 'id类型必须为number');
          return {
            id,
            name: randomString('乡镇'),
            pinyin: randomString('xiangzhen')
          } as Town;
        }
      },
      // 修改乡镇
      {
        method: 'PUT',
        url: `${this.baseUrl}/(\\d+)`,
        result: (urlMatches: (string)[], option: {body: {id: number, name: string, pinyin: string};}) => {
          let body = {} as {id: number, name: string, pinyin: string};
          let id;

          if (urlMatches) {
            id = +urlMatches[1];
          }
          if (option) {
            body = option.body;
          }

          Assert.isNumber(id, 'id must be set');
          Assert.isString(body.name, 'name must be set');
          Assert.isString(body.pinyin, 'name must be set');

          return {
            id: body.id,
            name: body.name,
            pinyin: body.pinyin
          } as Town;
        }
      },
      // 删除乡镇
      {
        method: 'DELETE',
        url: `${this.baseUrl}/(\\d+)`
      },
      // 判断乡镇名称是否存在
      {
        url: this.baseUrl + '/existByName',
        description: '判断乡镇名称是否存在',
        result: ((urlMatches: any, option: RequestOptions): boolean => {
          const params = option.params as HttpParams;
          Assert.isTrue(params.has('name'), 'name must be set');
          if (!params.has('name')) {
            throw new Error('未接收到查询参数name');
          }
          const name = params.get('name') as string;
          if (name === '乡镇一') {  //“乡镇一”模拟对应后台已有的乡镇名称
            return true;
          } else {
            return false;
          }
        })
      },
    ];
  }
}
