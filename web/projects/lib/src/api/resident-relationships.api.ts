import {ApiInjector, MockApiInterface} from '@yunzhi/ng-mock-api';
import {randomNumber, randomString} from '@yunzhi/utils';
import {ResidentRelationships} from '../entity/resident-relationships';
import {Resident} from '../entity/resident';

/**
 * 居民间关系
 */
export class ResidentRelationshipsApi implements MockApiInterface {
  private url = 'residentRelationships';

  getInjectors(): ApiInjector[] {
    return [
      {
        url: `${this.url}/getFromAllByResidentId/(\\d+)`,
        result: (urlMatchers: string[]) => {
          const residentId = +urlMatchers[1];
          const total = 5 + randomNumber(10);
          const result = [] as ResidentRelationships[];
          for (let i = 0; i < total; i++) {
            result.push({
              id: randomNumber(),
              oneResident: {
                id: residentId
              },
              anotherResident: {
                id: randomNumber(),
                name: randomString('姓名')
              } as Resident,
              relationship: {
                name: randomString('关系')
              }
            } as ResidentRelationships);
          }
          return result;
        }
      },
      {
        method: 'PUT',
        url: `${this.url}/updateBetweenTwoResidents`
      }
    ];
  }
}
