import {ApiInjector, MockApiInterface} from '@yunzhi/ng-mock-api';
import {HttpParams} from '@angular/common/http';
import {Assert, randomBoolean, randomNumber, randomString} from '@yunzhi/utils';
import {JobType} from '../entity/jobType';

export class JobTypeApi implements MockApiInterface {
  private url = 'jobType';

  getInjectors(): ApiInjector[] {
    return [{
      url: this.url + '/findTop20ByNameContains',
      description: '模糊查询前20个包含输入名称的数据列表，按使用时间排序，最近使用在靠前',
      result: (urlMatchers: any, option: {params: HttpParams}) => {
        Assert.isTrue(option.params.has('name'), '未接收到name参数');
        const name = option.params.get('name') as string;
        const result = [] as JobType[];
        for (let i = 0; i < 20; i++) {
          result.push({
            id: i + 1,
            name: randomString(name)
          } as JobType)
        }
        return randomBoolean() ? result : [];
      }
    }, {
      method: 'POST',
      url: this.url,
      description: '新增:注意在新增的同时，设置其最近使用时间为新建时间。 另外：' +
        '1. 名称是唯一的，所以在新增前最好查一下，如果查到了就直接返回已存的就好，同时更新其最近使用时间。' +
        '2. 注意去前后的空格',
      result: (urlMatchers: any, option: {body: {name: string}}) => {
        Assert.isString(option.body.name, '未接收到NAME值');
        const name = option.body.name;
        return {
          id: randomNumber(),
          name
        } as JobType
      }
    }, {
      method: 'PATCH',
      url: `${this.url}/updateLastUsedTime/(\\d+)`,
      description: '更新某个工作类型的最近使用时间为now',
      result: (urlMatchers: string[]) => {
        const id = +urlMatchers[1];
        Assert.isInteger(id, 'id type must be integer');
        return;
      }
    }
    ];
  }

}
