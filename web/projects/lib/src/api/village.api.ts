import {ApiInjector, MockApiInterface, RequestOptions} from '@yunzhi/ng-mock-api';
import {Assert, randomNumber, randomString, randomTimestamp} from '@yunzhi/utils';
import {Community} from '../entity/community';
import {Model} from '../entity/model';
import {HouseType} from '../entity/enum/house-type';
import {HttpParams} from '@angular/common/http';
import {Village} from '../entity/village';
import {Town} from '../entity/town';
import {Page} from '@yunzhi/ng-common';

/**
 * 小区管理mockApi
 */
export class VillageApi implements MockApiInterface {
  private baseUrl = 'village';

  getInjectors(): ApiInjector[] {
    return [
      // 新增小区
      {
        method: 'POST',
        url: this.baseUrl,
        description: 'save',
        result: (urlMatches: any, options: {
          body: {name: string, pinyin: string, longitude: number, latitude: number, houseType: HouseType, model: Model, establishTime: string, community: Community};
        }) => {
          let body = {} as {name: string, pinyin: string, longitude: number, latitude: number, houseType: HouseType, model: Model, establishTime: string, community: Community};

          if (options) {
            body = options.body;
          }
          Assert.isDefined(body, body.community, self.name + ' data validate false');
          Assert.isString(body.name, body.pinyin, self.name + 'some properties must be string');
          Assert.isNumber(body.longitude,
            body.latitude,
            body.houseType,
            body.community.id,
            body.establishTime, 'some properties must be number');

          return {
            id: randomNumber(),
            name: body.name,
            pinyin: body.pinyin,
            longitude: body.longitude,
            latitude: body.latitude,
            HouseType: body.houseType,
            establishTime: body.establishTime,
            community: body.community
          }
        }
      },

      // 分页查询
      {
        method: 'GET',
        url: `${this.baseUrl}/page`,
        result: (urlMatches: any, options: {params: HttpParams;}) => {
          const params = options.params as HttpParams;
          console.log('接受的参数为：', params);
          const page = +params.get('page');
          const size = +params.get('size');
          const houseType = +params.get('houseType');
          // 参数校验
          Assert.isNumber(page, size, 'page,size为必选');
          Assert.isNumber(houseType, '必须传入房屋类型');
          Assert.isDefined(params.get('name'), self.name + '选填参数未添加全');

          // 构建返回数据
          const beginId = page * size;
          const villages = new Array<Village>();
          // 设置初始时间模拟（当前时间）
          const dateTime = new Date();
          for (let i = 0; i < +size; i++) {
            const community = {
              id: randomNumber(),
              name: randomString('社区'),
              pinyin: randomString('pinyin'),
              town: {
                name: randomString('乡镇'),
              } as Town
            } as Community;
            const model = {
              id: randomNumber(),
              name: randomString('3D模型'),
              pinyin: randomString('pinyin'),
            } as Model;
            villages.push({
              id: beginId + i,
              name: randomString('小区'),
              pinyin: randomString('pinyin'),
              longitude: randomNumber(),
              latitude: randomNumber(),
              houseType: houseType,
              model,
              establishTime: dateTime.valueOf() - randomNumber() * 12345678,
              community,
            } as Village);
          }
          return {
            content: villages, number: page, size, totalElements: 40 + randomNumber()
          } as Page<Village>;
        }
      },
      // 删除小区
      {
        method: 'DELETE',
        url: `${this.baseUrl}/(\\d+)`,
      },
      {
        method: 'GET',
        description: 'getById 根据ID获取小区',
        url: `${this.baseUrl}/(\\d+)`,
        result: (urlMatches: Array<string>) => {
          // 使用 + 完成字符串向数字的转换
          const id = +urlMatches[1];
          Assert.isInteger(id, 'id类型必须为number');
          return {
            id,
            name: randomString('名称'),
            pinyin: randomString('pinyin'),
            longitude: randomNumber(10),
            latitude: randomNumber(10),
            houseType: randomNumber(2),
            establishTime: randomTimestamp(),
            model: {
              id: randomNumber(7),
              name: randomString('3D模型'),
              pinyin: randomString('pinyin'),
            } as Model,
            community: {
              id: randomNumber(10),
              name: randomString('社区名称'),
              pinyin: randomString('shequpinyin'),
              town: {
                id: randomNumber(10),
                name: randomString('乡镇'),
              } as Town,
            } as Community,
          } as Village;
        }
      },
      // 修改小区
      {
        method: 'PUT',
        url: `${this.baseUrl}/(\\d+)`,
        result: (urlMatches: (string)[], options: {
          body: Village;
        }) => {
          const id = +urlMatches[1];
          Assert.isInteger(id, 'id must be integer');

          const body = options.body;
          Assert.isDefined(body, body.community, body.model, body.community.town, 'som properties not defined');
          Assert.isNumber(id,
            body.community.id,
            body.community.town.id,
            body.latitude,
            body.latitude,
            body.establishTime,
            body.type, 'some properties must be number');
          Assert.isString(body.name, body.pinyin, 'some properties must be string');
          return {} as Village;
        }
      },
      // 获取所有小区id和name
      {
        method: 'GET',
        url: `${this.baseUrl}/getAll`,
        description: 'getAll',
        result: () => {
          const villages = new Array<Village>();
          const towns = new Array<Town>();
          for (let i = 0; i < 5; i++) {
            towns.push({id: i + 1, name: randomString('乡镇'), county: {id: randomNumber(10)}} as Town);
          }
          const communities = new Array<Community>();
          for (let i = 1; i <= 10; i++) {
            communities.push({
              id: i,
              pinyin: randomString('pinyin'),
              name: randomString('社区'),
              town: towns[randomNumber() % towns.length]
            } as Community)
          }
          for (let i = 0; i < 100; i++) {
            villages.push({
              id: i,
              name: randomString('名称'),
              pinyin: randomString('pinyin'),
              community: communities[randomNumber() % communities.length],
              houseType: randomNumber(1)
            } as Village);
          }
          return villages;
        }
      },
      // 判断小区名称是否存在
      {
        url: this.baseUrl + '/existByName',
        description: '判断小区名称是否存在',
        result: (urlMatches: any, option: RequestOptions): boolean => {
          const params = option.params as HttpParams;
          Assert.isTrue(params.has('name'), 'name must be set');
          if (!params.has('name')) {
            throw new Error('未接收到查询参数name');
          }
          const name = params.get('name') as string;
          return name === '小区';
        }
      },
    ]
  }
}
