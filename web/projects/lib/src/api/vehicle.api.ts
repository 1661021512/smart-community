import {ApiInjector, Assert, MockApiInterface} from '@yunzhi/ng-mock-api';
import {randomBoolean, randomNumber, randomString} from '@yunzhi/utils';
import {HttpParams} from '@angular/common/http';
import {Page} from '@yunzhi/ng-common';
import {Vehicle} from '../entity/vehicle';
import {Resident} from '../entity/resident';
import {VehicleBrand} from '../entity/vehicle-brand';
import {VehicleType} from '../entity/vehicle-type';
import {User} from '../entity/user';
import {House} from '../entity/house';
import {ResidentApi} from './resident.api';

/**
 * 车辆管理Api
 */
export class VehicleApi implements MockApiInterface {
  protected baseUrl = 'vehicle';

  public static getOneVehicle(id = 123) {
    const result = {
      id: id,
      owner: ResidentApi.getByIdAndIdNumber(id, '510103196502083435'),
      plateNumber: randomString('车牌号'),
      brand: {name: randomString('品牌')} as VehicleBrand,
      type: {id: randomNumber(5), name: randomString('类型')} as VehicleType,
      colour: randomNumber(9),
      parkingSpaceNumber: randomString(),
      parkingSpaceType: randomNumber(2),
      createTime: randomNumber(),
    } as Vehicle;
    result.owner.encodedPhone = '139****0000';
    return result;
  }

  getInjectors(): ApiInjector[] {
    return [{
      url: this.baseUrl + '/page',
      method: 'GET',
      description: 'page 分页',
      result: (urlMatches: (string)[], options: { params: HttpParams; }) => {
        const params = options.params as HttpParams;
        const page = +params.get('page');
        const size = +params.get('size');
        // 参数校验
        Assert.isNotNullOrUndefined(page, size, 'page,size为必选');
        let vehicles = new Array<Vehicle>();
        for (let i = 0; i < +size; i++) {
          vehicles.push({
            id: randomNumber(),
            owner: {
              name: randomString('居民'),
              phone: randomString('电话'),
              houses: [{
                unit: {
                  building: {
                    village: {
                      name: randomString('小区'),
                      community: {id: randomNumber(), name: randomString('community')}
                    }
                  }
                }
              } as House] as House[]
            } as Resident,
            plateNumber: randomString('车牌号'),
            brand: {name: randomString('品牌')} as VehicleBrand,
            type: {name: randomString('类型')} as VehicleType,
            colour: randomNumber(9),
            parkingSpaceNumber: randomString(),
            parkingSpaceType: randomNumber(2),
            createTime: randomNumber(),
          } as Vehicle);
        }
        return {
          content: vehicles, number: page, size, totalElements: 40 + randomNumber()
        } as Page<Vehicle>;
      }
    }, {
      method: 'DELETE',
      description: 'delete 删除',
      url: `${this.baseUrl}/(\\d+)`
    }, {
      method: 'POST',
      url: this.baseUrl,
      description: 'save: 新增车辆',
      result: (urlMatches: any, option: {
        body: Vehicle;
      }) => {
        let body = {} as Vehicle;

        if (option) {
          body = option.body;
        }

        return {
          id: randomNumber(),
          owner: {id: body.owner.id, name: body.owner.name},
          plateNumber: body.plateNumber,
          brand: {id: randomNumber(), name: body.brand.name},
          type: {id: body.type.id, name: randomString('车辆类型')},
          colour: body.colour,
          parkingSpaceNumber: body.parkingSpaceNumber,
          parkingSpaceType: body.parkingSpaceType,
        } as Vehicle
      }
    }, {
      method: 'GET',
      url: `${this.baseUrl}/(\\d+)`,
      description: '根据id获取车辆实体',
      result: (urlMatches: Array<string>) => {
        const id = +urlMatches[1];
        return VehicleApi.getOneVehicle(id);
      }
    }, {
        description: 'update: 更新车辆',
        url: `${this.baseUrl}/(\\d+)`,
        method: 'PUT',
        result: (urlMatches: (string)[], option: {
          body: Vehicle;
        }) => {
          const Vehicle = option.body;

          return {
            ...Vehicle,
            ...{
              id: +urlMatches[1],
            }
          }
        }
      }
    ];
  }
}
