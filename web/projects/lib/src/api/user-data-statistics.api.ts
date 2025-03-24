import {ApiInjector, MockApiInterface} from '@yunzhi/ng-mock-api';
import {Page} from '@yunzhi/ng-common';
import {WebUserDataStatistics} from '../entity/web-user-data-statistics';

export class UserDataStatisticsApi implements MockApiInterface {
  private readonly baseUrl = 'UserDataStatistics';
  getInjectors(): ApiInjector[] {
    return [
      {
        url: this.baseUrl + '/pageByBelongDistrictId/(\\d+)',
        result: () => {
          return {
            content: []
          } as Page<WebUserDataStatistics>
        }
      }
    ];
  }

}
