import {ApiInjector, Assert, MockApiInterface} from '@yunzhi/ng-mock-api';
import {HttpParams} from '@angular/common/http';
import {randomNumber, randomString} from '@yunzhi/utils';
import {Page} from '@yunzhi/ng-common';
import {Duty} from '../entity/duty';
import {DISTRICT_TYPE, DistrictType} from '../entity/enum/district-type';

/**
 * 岗位管理api
 */
export class DutyApi implements MockApiInterface {
  protected baseUrl = 'duty';

  getInjectors(): ApiInjector[] {
    return [
      // 分页
      {
        method: 'GET',
        description: '分页，对应service中的page方法' +
          '后台返回的对象按照权重排序，数值越小越靠前',
        url: `${this.baseUrl}/page`,
        result: (urlMatches: any, options: {params: HttpParams;}) => {
          const params = options.params as HttpParams;
          console.log('接受的参数为：', params);
          const page = +params.get('page');
          const size = +params.get('size');
          // 参数校验
          Assert.isNotNullOrUndefined(page, size, self.name + ' page,size为必选');
          Assert.isTrue(!Number.isNaN(page) && !Number.isNaN(size), 'page,size 不能为NaN');
          // 构建返回数据
          const beginId = page * size;
          const posts = new Array<Duty>();
          const index = ['town', 'community'];

          for (let i = 0; i < +size; i++) {
            posts.push({
              id: beginId + i,
              name: randomString('岗位'),
              weight: randomNumber(),
              // 区域类型返回 town 或 community
              typeOfDistrict: DISTRICT_TYPE[index[randomNumber(2)]].value as DistrictType
            } as Duty);

          }
          // 返回了 一个对象
          return {
            content: posts, number: page, size, totalElements: (page + 1) * size + randomNumber(40)
          } as Page<Duty>;
        }
      },
      {
        url: `${this.baseUrl}/getAllByDistrictType/(\\w+)`,
        description: 'getAllByDistrictType: 根据当前用户区域类型获取当前登录用户对应区域的岗位列表',
        result: () => {
          const posts = [] as Duty[];
          for (let i = 0; i < 10; i++) {
            posts.push({
              id: i + 1,
              name: randomString('岗位'),
              weight: i + 1,
            } as Duty)
          }
          return posts;
        }
      },
      {
        method: 'POST',
        description: 'save: 新增岗位',
        url: this.baseUrl,
        result: (urlMatches: any, options: {body: {name: string, weight: number, typeOfDistrict: DistrictType};}) => {
          let body = {} as {name: string, weight: number, typeOfDistrict: DistrictType};

          if (options) {
            body = options.body;
          }

          // 断言传入的数据不为空
          Assert.isString(body.name, 'name must be set');
          Assert.isNumber(body.weight, 'weight must be set');
          Assert.isString(body.typeOfDistrict, 'typeOfDistrict must be set');

          // 构造返回数据
          return {
            id: randomNumber(),
            name: body.name,
            weight: body.weight,
            typeOfDistrict: body.typeOfDistrict
          } as Duty;
        }
      },
      {
        method: 'GET',
        description: 'getById 根据ID获取岗位',
        url: `${this.baseUrl}/(\\d+)`,
        result: (urlMatches: Array<string>) => {
          // 使用 + 完成字符串向数字的转换
          const id = +urlMatches[1];
          Assert.isNumber(id, 'id类型必须为number');
          const index = ['town', 'community'];

          return {
            id,
            name: randomString('岗位'),
            weight: randomNumber(),
            // 区域类型返回 town 或 community
            typeOfDistrict: DISTRICT_TYPE[index[randomNumber(2)]].value as DistrictType
          } as Duty;
        }
      },
      {
        method: 'PUT',
        description: '修改岗位',
        url: `${this.baseUrl}/(\\d+)`,
        result: (urlMatches: (string)[], option: {body: {id: number, name: string, weight: number, typeOfDistrict: DistrictType};}) => {
          let body = {} as {id: number, name: string, weight: number, typeOfDistrict: DistrictType};
          let id;

          if (urlMatches) {
            id = +urlMatches[1];
          }
          if (option) {
            body = option.body;
          }

          Assert.isNumber(id, 'id must be set');
          Assert.isString(body.name, 'name must be set');
          Assert.isNumber(body.weight, 'weight must be set');
          Assert.isString(body.typeOfDistrict, 'typeOfDistrict must be set');

          return {
            id: body.id,
            name: body.name,
            weight: body.weight,
            typeOfDistrict: body.typeOfDistrict
          } as Duty;
        }
      },
      {
        method: 'DELETE',
        description: 'delete 删除岗位',
        url: `${this.baseUrl}/(\\d+)`
      },
    ]
  }

}
