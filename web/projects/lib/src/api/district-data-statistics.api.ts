import {ApiInjector, MockApiInterface} from '@yunzhi/ng-mock-api';
import {DistrictDataStatistics} from '../entity/district-data-statistics';
import {randomNumber} from '@yunzhi/utils';

export class DistrictDataStatisticsApi implements MockApiInterface {
  private readonly baseUrl = 'DistrictDataStatistics'

  getInjectors(): ApiInjector[] {
    return [
      {
        url: this.baseUrl + '/getByDistrictId/(\\d+)',
        result: {
          district: {
            id: randomNumber()
          }
        } as DistrictDataStatistics
      }, {
        url: this.baseUrl + '/getSonDistrictDataByDistrictId/(\\d+)',
        result: []
      }
    ];
  }

}
