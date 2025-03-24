import {ApiInjector, MockApiInterface} from '@yunzhi/ng-mock-api';
declare var require: any;

export class AssetsApi implements MockApiInterface {
  private readonly baseUrl = '/assets';
  getInjectors(): ApiInjector[] {
    return [
      {
        url: this.baseUrl + '/geojson/(\\w+).json',
        result: urlMatches => {
          const path = urlMatches[1];
          return require(`../../../../src/assets/geojson/${path}.json`);
        }
      }
    ];
  }

}
