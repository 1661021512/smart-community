import {ApiInjector, MockApiInterface} from '@yunzhi/ng-mock-api';
import {randomNumber, randomString} from '@yunzhi/utils';
import {DistrictHouseResidentCount} from '../entity/district-house-resident-count';
import {HttpParams} from "@angular/common/http";
import {Page} from "@yunzhi/ng-common";
import {Statistics} from "../entity/statistics";
import {District} from "../entity/district";
import {WebUser} from '../entity/web-user';

/**
 * 统计API
 */
export class StatisticsApi implements MockApiInterface {
  private url = 'statistics';
  getInjectors(): ApiInjector[] {
    return [
      {
        url: this.url + '/getSonDistrictHouseAndResidentCountOfCurrentUser',
        description: 'getSonDistrictHouseAndResidentCountOfCurrentUser 获取当前登录用户所在区域的子区域的住房与居民的总数',
        result: () => {
          const result = [] as DistrictHouseResidentCount[];
          const totalCount = randomNumber(10);
          for (let i = 0; i < totalCount; i++) {
            result.push({
              district: {name: randomString('名称')},
              houseCount: randomNumber(200),
              residentCount: randomNumber(300)
            } as DistrictHouseResidentCount)
          }
          return result;
        }
      },
      {
        method: 'GET',
        url: `${this.url}/pageOfLast`,
        result: (urlMatches: any, options: {params: HttpParams;}) => {
          const params = options.params as HttpParams;
          console.log('接受的参数为：', params);
          const page = +params.get('page');
          const size = +params.get('size');

          // 构建返回数据
          const statistics = new Array<Statistics>();
          for (let i = 0; i < +size; i++) {
            statistics.push({
              webUser: {
                id: randomNumber(),
                name: randomString('name'),
                username: '13912345678' ,
                district: {
                  id: randomNumber(),
                  name: randomString('所属区域'),
                  type: 'village'
                } as District,
              } as WebUser,
              createTime: randomNumber(),
              totalCount: randomNumber(),

            } as Statistics);
          }
          // 返回了 一个对象
          return {
            content: statistics, number: page, size, totalElements: 40 + randomNumber()
          } as Page<Statistics>;
        }
      },
    ];
  }

}
