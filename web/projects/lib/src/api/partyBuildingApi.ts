import {ApiInjector, MockApiInterface} from '@yunzhi/ng-mock-api';
import {Assert, randomNumber, randomString} from '@yunzhi/utils';
import {PartyBuilding} from 'projects/lib/src/entity/partyBuilding';
import {Duty} from 'projects/lib/src/entity/duty';
import {District} from 'projects/lib/src/entity/district';

/**
 * 党建管理mockApi
 */
export class PartyBuildingApi implements MockApiInterface {
  protected baseUrl = 'partyBuilding';

  getInjectors(): ApiInjector[] {
    return [
      {
        url: this.baseUrl + '/getAllOfCurrentUserDistrict',
        description: 'getAllOfCurrentUserDistrict',
        result: () => {
          const total = 4 + randomNumber(5);
          const result = [] as PartyBuilding[];
          for (let i = 0; i < total; i++) {
            result.push({
              personName: randomString('姓名'),
              duty: {
                name: randomString('岗位'),
                weight: randomNumber()
              },

            } as PartyBuilding);

          }
          return result;
        }
      },
      {
        url: this.baseUrl + '/saveOfCurrentDistrict',
        method: 'POST'
      },
      {
        url: this.baseUrl + '/(\\d+)',
        description: 'getById ',
        result: (urlMatches: any) => {
          const id = +urlMatches[1];
          Assert.isInteger(id, 'id,districtId must be set');
          return {
            id,
            personName: randomString('姓名'),
            duty: {
              id: randomNumber(10),
              name: randomString('职务')
            } as Duty,
            district: {
              id: randomNumber(10) + 1,
              name: randomString('区域')
            } as District
          } as PartyBuilding;
        }
      },
      {
        method: 'GET',
        url: `${this.baseUrl}/(\\d+),(\\d+)`,
        description: 'getById 根据id获取党建管理-职务人员信息',
        result: (urlMatches: any) => {
          const postId = +urlMatches[1];
          const districtId = +urlMatches[1];
          Assert.isNotNullOrUndefined(postId, districtId, 'postId,districtId must be set');
          if (postId === 10 && districtId === 10) {
            return null as PartyBuilding;
          } else {
            return {
              id: randomNumber(),
              personName: randomString('姓名'),
              duty: {
                id: randomNumber(10),
                name: randomString('职务')
              } as Duty,
              district: {
                id: randomNumber(10) + 1,
                name: randomString('区域')
              } as District
            } as PartyBuilding;
          }
        }
      },
      {
        method: 'PUT',
        url: `${this.baseUrl}/(\\d+),(\\d+)`,
        description: '修改党建管理-职务人员信息',
        result: (urlMatches: (string)[], options: {
          body: PartyBuilding;
        }) => {
          const body = options.body;
          Assert.isDefined(body, body.duty.id, body.district.id, 'some properties must be set');
          return {} as PartyBuilding;
        }
      },
      {
        method: 'PATCH',
        url: this.baseUrl + '/(\\d+)'
      },
      {
        method: 'POST',
        description: 'save() | 新增党建管理-职务人员信息',
        url: this.baseUrl,
        result: (urlMatches: any, options: {
          body: PartyBuilding;
        }) => {
          const body = options.body;
          Assert.isDefined(body, body.duty.id, body.district.id, 'some properties must be set');
          return {} as PartyBuilding;
        }
      },
      {
        url: `${this.baseUrl}/getAllByDistrictId/(\\d+)`,
        description: 'getAllByDistrictId 根据districtId获取党建管理-职务人员信息',
        result: (urlMatches: any) => {
          const districtId = +urlMatches[1];
          Assert.isNotNullOrUndefined(districtId, 'districtId must be set');
          const partBuildings = [] as PartyBuilding[];
          for (let i = 0; i <= 4; i++) {
            partBuildings.push({
              id: i,
              personName: randomString('姓名'),
              duty: {
                id: randomNumber(10),
                name: randomString('岗位')
              } as Duty,
              district: {
                id: districtId
              } as District
            } as PartyBuilding);
          }
          return partBuildings;
        }
      },
      {
        method: 'DELETE',
        url: this.baseUrl + '/(\\d+)'
      }
    ];
  }
}
