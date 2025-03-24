import {ApiInjector, Assert, MockApiInterface, RequestOptions} from '@yunzhi/ng-mock-api';
import {randomNumber, randomString} from '@yunzhi/utils';
import {VehicleType} from '../entity/vehicle-type';
import {HttpParams} from '@angular/common/http';
import {Page} from '@yunzhi/ng-common';

/**
 * 车辆类型管理Api
 */

export class VehicleTypeApi implements MockApiInterface {
  protected baseUrl = 'vehicleType';

  public static getOneVehicleType(id = 123) {
    const type = ['小轿车', '面包车', '农用车', '其他载货汽车', '其他载客汽车']
    const result = {
      id,
      name: randomString(type[randomNumber(4)]),
      weight: randomNumber(),
    } as VehicleType
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
        Assert.isDefined(params.get('name'), self.name + ' 选填参数未添加全');
        let vehicleTypes = new Array<VehicleType>();
        for (let i = 0; i < +size; i++) {
          vehicleTypes.push(VehicleTypeApi.getOneVehicleType())
        }
        // 按照权重从小到大排序
        vehicleTypes = vehicleTypes.sort((v1, v2) => v1.weight - v2.weight);
        return {
          content: vehicleTypes, number: page, size, totalElements: 40 + randomNumber()
        } as Page<VehicleType>;
      }
    }, {
      method: 'DELETE',
      description: 'delete 删除',
      url: `${this.baseUrl}/(\\d+)`
    }, {
      method: 'POST',
      description: 'save 车辆类型新增',
      url: this.baseUrl,
      result: (urlMatches: any, option: {
        body: {
          name: string,
          weight: number
        };
      }) => {
        let body = {} as {
          name: string,
          weight: number
        };
        if (option) {
          body = option.body
        }
        return {
          id: randomNumber(),
          name: body.name,
          weight: body.weight
        } as VehicleType
      }
    }, {
      method: 'GET',
      url: `${this.baseUrl}/(\\d+)`,
      description: '根据id获取车辆类型',
      result: (urlMatches: Array<string>) => {
        const id = +urlMatches[1];
        return VehicleTypeApi.getOneVehicleType(id);
      }
    }, {
      description: 'update: 更新车辆类型',
      url: `${this.baseUrl}/(\\d+)`,
      method: 'PUT',
      result: (urlMatches: (string)[], option: {
        body: VehicleType;
      }) => {
        const vehicleType = option.body;

        return {
          ...vehicleType,
          ...{
            id: +urlMatches[1],
          }
        }
      }
    },{
      method: 'GET',
      url: `${this.baseUrl}`,
      result: () => {
        const vehicleTypes = [] as VehicleType[];
        for (let i = 0; i < 5; i++) {
          vehicleTypes.push(
            {
              id: i,
              name: randomString('type', 2),
              weight: randomNumber(),
            } as VehicleType
          )
        }
        return vehicleTypes;
      }
    }, {
      method: 'GET',
      url: this.baseUrl + '/nameIsAvailable',
      description: '判断车辆类型名称是否可用',
      result: (urlMatches: any, option: RequestOptions): boolean => {
        const params = option.params as HttpParams;
        Assert.isTrue(params.has('name'), 'name must be set');
        if (!params.has('name')) {
          throw new Error('未接收到查询参数name');
        }
        const name = params.get('name') as string;
        //用于进行单元测试，规定输入‘重复车辆类型’时返回false，输入‘车辆类型’时返回true，否则随机返回
        if (name === '重复车辆类型') {
          return false;
        }
        if (name === '车辆类型') {
          return true;
        }
        return randomNumber(5) < 2;
      }
    }
    ]
  }
}
