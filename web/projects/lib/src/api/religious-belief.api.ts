import {ApiInjector, MockApiInterface} from '@yunzhi/ng-mock-api';
import {HttpParams} from '@angular/common/http';
import {Assert, randomString} from '@yunzhi/utils';
import {ReligiousBelief} from '../entity/religious-belief';


/**
 * 宗教信仰
 * author zhangrui
 */
export class ReligiousBeliefApi implements MockApiInterface {
  private url = 'religiousBelief';

  getInjectors(): ApiInjector[] {
    return [{
      url: this.url + '/findTop20ByNameContains',
      description: '模糊查询以name为查询关键字的前10项记录',
      result: (urlMatchers: string[], option: { params: HttpParams }) => {
        const params = option.params;
        Assert.isTrue(params.has('name'), '未接收到name查询参数');
        const name = params.get('name');
        const result = [] as ReligiousBelief[];
        for (let i = 0; i < 10; i++) {
          result.push({
            id: i + 1,
            name: randomString(name)
          } as ReligiousBelief)
        }

        return result;
      }
    }];
  }

}
