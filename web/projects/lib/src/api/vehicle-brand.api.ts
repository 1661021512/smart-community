import {ApiInjector, Assert, MockApiInterface, RequestOptions} from '@yunzhi/ng-mock-api';
import {randomNumber, randomString} from '@yunzhi/utils';
import {HttpParams} from '@angular/common/http';
import {Page} from '@yunzhi/ng-common';
import {VehicleBrand} from "../entity/vehicle-brand";

/**
 * 车辆品品牌管理Api
 */
export class VehicleBrandApi implements MockApiInterface {
  protected baseUrl = 'vehicleBrand';

  public static getOneVehicleBrand(id = 123) {
    const result = {
      id,
      name: randomString('车辆品牌'),
    } as VehicleBrand
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
        const vehicleBrands = new Array<VehicleBrand>();
        for (let i = 0; i < +size; i++) {
          vehicleBrands.push(VehicleBrandApi.getOneVehicleBrand())
        }
        return {
          content: vehicleBrands, number: page, size, totalElements: 40 + randomNumber()
        } as Page<VehicleBrand>;
      }
    }, {
      method: 'DELETE',
      description: 'delete 删除',
      url: `${this.baseUrl}/(\\d+)`
    }, {
      method: 'PUT',
      description: 'update',
      url: `${this.baseUrl}/(\\d+)`,
      result: (urlMatches: (string)[], option: {
        body: VehicleBrand;
      }) => {
        const id = +urlMatches[1];
        Assert.isNumber(id, 'id must be number');
        const body = option.body;
        Assert.isString(body.name, 'name mast be string');
        return body as VehicleBrand;
      }
    }, {
      method: 'POST',
      url: this.baseUrl,
      description: 'save 新增',
      result: (urlMatches: (string)[], option: {
        body: VehicleBrand;
      }) => {
        const body = option.body;
        Assert.isString(body.name, 'name mast be string');
        return {
          id: randomNumber(),
          name: body.name,
        } as VehicleBrand
      }
    }, {
      method: 'GET',
      url: this.baseUrl + `/getByNameIfNotExistThenSave`,
      description: '根据name获取车辆品牌,如果没有获取到，那么先将该name作为车辆品牌实体保存，再返回车辆品牌实体',
      result: (urlMatches: (string)[], options: { params: HttpParams; }) => {
        const params = options.params as HttpParams;
        Assert.isDefined(params.get('name'), self.name + ' 选填参数未添加全');
        return {id: randomNumber(), name: params.get('name')} as VehicleBrand;
      }
    }, {
      method: 'GET',
      url: this.baseUrl + '/existByName',
      description: '判断车辆品牌名称是否存在',
      result: (urlMatches: any, option: RequestOptions): boolean => {
        const params = option.params as HttpParams;
        Assert.isTrue(params.has('name'), 'name must be set');
        if (!params.has('name')) {
          throw new Error('未接收到查询参数name');
        }
        const name = params.get('name') as string;
        //用于进行单元测试，规定输入‘重复车辆品牌’时返回true，输入‘车辆品牌’时返回false，否则随机返回
        if (name === '重复车辆品牌') {
          return true;
        }
        if (name === '车辆品牌') {
          return false;
        }
        return randomNumber(5) < 2;
      }
    }
    ]
  }
}
