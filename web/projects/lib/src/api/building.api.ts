import {ApiInjector, MockApiInterface} from '@yunzhi/ng-mock-api';
import {Assert, randomBoolean} from '@yunzhi/utils';
import {randomNumber, randomString} from '@yunzhi/utils';
import {Building} from '../entity/building';
import {HttpParams} from '@angular/common/http';
import {Page} from '@yunzhi/ng-common';
import {Unit} from '../entity/unit';
import {House_TYPE} from '../entity/enum/house-type';
import {House} from '../entity/house';
import {Resident} from '../entity/resident';

/**
 * 住宅楼管理mockA
 */
export class BuildingApi implements MockApiInterface {
  private baseUrl = 'building';
  private name = 'BuildingApi: ';

  getInjectors(): ApiInjector[] {
    return [
      // 分页查询
      {
        method: 'GET',
        url: `${this.baseUrl}/page`,
        description: 'page',
        result: ((urlMatches: any, option: {params: HttpParams}) => {
          const params = option.params as HttpParams;
          Assert.isTrue(params.has('page'),
            params.has('size'),
            params.has('villageId'),
            params.has('houseType'),
            self.name + ' 选填参数未添加全');
          const page = +params.get('page');
          const size = +params.get('size');
          const houseType = +params.get('houseType');
          // 小区ID
          const villageId = +params.get('villageId');

          // 参数校验
          Assert.isNotNullOrUndefined(page, size, 'page,size为必选');

          // 构建返回数据
          const beginId = page * size;
          const buildings = new Array<Building>();
          for (let i = 0; i < +size; i++) {
            const units = [];
            if (randomBoolean()) {
              units.push({} as Unit);
            }
            buildings.push({
              id: beginId + i,
              name: randomString('楼'),
              horizontalOffset: randomNumber(1000),
              verticalOffset: randomNumber(1000),
              unitCount: randomNumber(5) + 1,
              houseType: houseType,
              maxFloor: randomNumber(10) + 1,
              village: {
                id: randomNumber(),
                name: randomString('小区')
              },
              units
            } as Building);
          }
          // 返回一个对象
          return {
            content: buildings, number: page, size, totalElements: 40 + randomNumber()
          } as Page<Building>;
        })
      },
      {
        method: 'GET',
        url: `${this.baseUrl}/(\\d+)`,
        description: 'getById 根据ID获取住宅楼',
        result: (urlMatches: Array<string>) => {
          // 使用 + 完成字符串向数字的转换
          const id = +urlMatches[1];
          Assert.isInteger(id, 'id类型必须为number');
          const units = new Array<Unit>({
              id: 3,
              name: '1单元',
              weight: 1,
              building: {
                houseType: House_TYPE.building.value
              }
            } as Unit,
            {
              name: '2单元',
              weight: 1,
              building: {
                houseType: House_TYPE.building.value
              }
            } as Unit)
          return {
            id,
            name: randomString('名称'),
            horizontalOffset: randomNumber(10),
            verticalOffset: randomNumber(10),
            unitCount: randomNumber(5),
            houseType: randomNumber(2),
            maxFloor: randomNumber(10),
            housesLengthOfFloor: randomNumber(3) + 1,
            units: units,
            village: {
              id: randomNumber(),
              name: randomString('小区')
            }
          } as Building;
        }
      },
      {
        method: 'POST',
        url: `${this.baseUrl}`,
        description: 'save 新增住宅',
        result: (urlMatches: any, options: {
          body: Building;
        }) => {
          const body = options.body;
          Assert.isString(body.name, this.name + 'name must be string');
          Assert.isNumber(body.verticalOffset,
            body.village.id,
            body.verticalOffset,
            body.houseType,
            body.unitCount,
            body.maxFloor,
            body.housesLengthOfFloor,
            this.name + 'some properties must be number');
          return {
            id: randomNumber(),
            name: body.name,
            horizontalOffset: body.horizontalOffset,
            verticalOffset: body.verticalOffset,
            type: body.type,
            units: body.units,
            unitCount: body.unitCount,
            maxFloor: body.maxFloor,
            housesLengthOfFloor: body.housesLengthOfFloor,
            village: {
              id: body.village.id
            }
          }
        }
      },
      {
        method: 'PUT',
        url: `${this.baseUrl}/(\\d+)`,
        description: 'update 修改住宅楼',
        result: (urlMatches: (string)[], option: {
          body: Building;
        }) => {
          const id = +urlMatches[1];
          Assert.isInteger(id, 'id must be integer');

          const body = option.body;
          Assert.isString(body.name, 'name must be string');
          Assert.isNumber(id,
            body.horizontalOffset,
            body.verticalOffset,
            body.unitCount,
            body.houseType,
            body.maxFloor,
            body.housesLengthOfFloor,
            this.name + 'some properties must be number');
          return {} as Building;
        }
      },
      {
        method: 'DELETE',
        url: `${this.baseUrl}/(\\d+)`,
        description: '删除用户'
      },
      {
        url: `${this.baseUrl}/getByVillageId/(\\d+)`,
        method: 'GET',
        result: (urlMatches: Array<String>) => {
          const villageId = +urlMatches[1];
          Assert.isNumber(villageId, 'villageId must be number');
          let buildings = new Array<Building>();
          for (let i = 0; i < 10; i++) {
            buildings.push({
              id: i + 1,
              name: randomString('name')
            } as Building)
          }
          return buildings;
        }
      }, {
        url: this.baseUrl + '/getByIdWithUnitsAndResidents/(\\d+)',
        result: (urlMatches: String[]) => {
          const id = +urlMatches[1];
          const result = {
            id,
            name: randomString('名称'),
            units: []
          };
          for (let i = 0; i < 3; i++) {
            const unit = {
              houses: [],
              name: i + 1 + '单元'
            } as Unit;
            result.units.push(unit);

            const houseTotal = (5 + randomNumber(5)) * 2;
            for (let j = 0; j < houseTotal; j++) {
              const house = {
                floor: Math.floor(j / 2) + 1,
                weight: j,
                name: (i + 1).toString() + '0' + ((j % 2) + 1).toString(),
                residents: []
              } as House;
              unit.houses.push(house);
              const totalResidents = randomNumber(5);
              for (let k = 0; k < totalResidents; k++) {
                const resident = {
                  name: randomString('居民姓名'),
                  sex: randomBoolean()
                } as Resident;
                house.residents.push(resident);
              }
            }
          }
          return result;
        }
      }
    ]
  }
}
