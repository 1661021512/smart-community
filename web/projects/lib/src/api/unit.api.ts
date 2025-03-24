import {ApiInjector, MockApiInterface} from '@yunzhi/ng-mock-api';
import {Unit} from '../entity/unit';
import {Assert, randomNumber, randomString} from '@yunzhi/utils';

/**
 * 单元mockApi
 */
export class UnitApi implements MockApiInterface {

  protected baseUrl = 'unit';
  private name = 'UnitApi: ';

  getInjectors(): ApiInjector[] {
    return [
      {
        description: 'getById: 通过ID获取',
        url: `${this.baseUrl}/(\\d+)`,
        result: (urlMatches: (string)[]) => {
          const id = +urlMatches[1];
          return {
            id,
            maxFloor: randomNumber(10)
          }
        }
      },
      // 修改
      {
        method: 'PUT',
        url: `${this.baseUrl}/(\\d+)`,
        result: (urlMatches: (string)[], option: {
          body: Unit
        }) => {
          const id = +urlMatches[1];
          const body = option.body;
          Assert.isNumber(
            id,
            body.weight
          );
          Assert.isString(
            body.name
          );
          return {} as Unit;
        }
      },

      // 新增
      {
        method: 'POST',
        url: `${this.baseUrl}`,
        result: (urlMatches: any, option: {
          body: Unit
        }) => {
          const body = option.body;
          Assert.isDefined(body.building, this.name + 'building not defined');
          Assert.isNumber(
            body.weight,
            body.building.id,
            this.name + 'type must be number'
          );
          Assert.isString(
            body.name,
            this.name + 'type must be string'
          );
          return {
            id: randomNumber(),
            weight: randomNumber(),
            name: randomString('name'),
            building: {id: body.building.id}
          } as Unit
        }
      },
      // 根据楼房Id获取其中所有单元
      {
        method: 'GET',
        url: `${this.baseUrl}/getByBuildingId/(\\d+)`,
        result: (urlMatches: Array<String>) => {
          const buildingId = +urlMatches[1];
          Assert.isNumber(buildingId, 'buildingId must be number');
          console.log(buildingId);
          let units = new Array<Unit>();
          for (let i = 0; i < 6; i++) {
            units.push({
              id: i + 1,
              weight: randomNumber(),
              name: (i + 1) + '单元',
            } as Unit);
          }
          return units;
        }
      }
    ];
  }
}
