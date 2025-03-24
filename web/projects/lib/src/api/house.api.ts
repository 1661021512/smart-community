import {HttpParams} from '@angular/common/http';
import {Assert, randomBoolean, randomNumber, randomString, randomTimestamp} from '@yunzhi/utils';
import {Page} from '@yunzhi/ng-common';
import {House} from 'projects/lib/src/entity/house';
import {Village} from 'projects/lib/src/entity/village';
import {Community} from 'projects/lib/src/entity/community';
import {Unit} from 'projects/lib/src/entity/unit';
import {Building} from 'projects/lib/src/entity/building';
import {ApiInjector, MockApiInterface, RequestOptions} from '@yunzhi/ng-mock-api';
import {HOUSE_OWN_TYPE} from '../entity/enum/house-own-type';
import {Resident} from '../entity/resident';
import {ReligiousBelief} from '../entity/religious-belief';
import {Town} from '../entity/town';
import {Grider} from '../entity/grider';

/**
 * 房屋管理mockApi
 */
export class HouseApi implements MockApiInterface {
  protected baseUrl = 'house';
  private name = 'HouseApi: ';
  public static getOneHouse(id = 123) {
    const result = {
      id,
      name: randomString('名称'),
      area: randomNumber(100),
      floor: randomNumber(10),
      weight: randomNumber(10),
      type: HOUSE_OWN_TYPE.own.value,
      lowIncoming: randomBoolean(),
      relief: randomBoolean(),
      unit: {
        id: randomNumber(),
        name: randomString('单元'),
        weight: randomNumber(20),
        building: {
          id: randomNumber(),
          name: randomString('楼房'),
          village: {
            id: randomNumber(),
            name: randomString('小区'),
            community: {
              id: randomNumber(),
              name: randomString('社区'),
              town: {
                id: randomNumber(),
                name: randomString('乡镇')
              }
            }
          }
        } as Building
      } as Unit,
      remarks: randomString('备注'),
      checkInTime: randomTimestamp(),
      owner: {
        id: null,
        name: ''
      } as Resident
    } as House;

    // 为房子添加居住人员
    const total = randomNumber(5);
    result.residents = [];
    for (let i = 0; i < total; i++) {
      const resident = {
        id: i + 1,
        name: randomString('名称'),
        sex: randomBoolean(),
        encodedIdNumber: 'xxxxxx19820606xx13',
        encodedPhone: '139xxxx5678',
        nationality: randomNumber(56),
        politicalClimate: randomNumber(2),
        education: randomNumber(3),
        religiousBelief: {name: randomString('宗教')} as ReligiousBelief,
        workPlace: randomString('工作地点')
      } as Resident;
      result.residents.push(resident);
    }

    // 随机添加房主信息
    if (randomBoolean() && result.residents.length > 0) {
      result.owner = result.residents[randomNumber(result.residents.length)];
    }
    return result;
  }

  public getHouses(size: number, beginId: number, dateTime: Date) {
    const houses = new Array<House>();
    for (let i = 0; i < +size; i++) {
      // 为房子添加居住人员
      const residents = new Array<Resident>();
      for (let i = 0; i < randomNumber(4) + 1; i++) {
        residents.push({
          name: randomString('居住人员')
        } as Resident)
      }
      const house = {
        id: beginId + i + 1,
        unit: {
          id: randomNumber(),
          name: randomString('单元'),
          building: {
            id: randomNumber(),
            name: randomString('栋（排）'),
            village: {
              id: randomNumber(),
              name: randomString('小区'),
              community: {
                id: randomNumber(),
                name: randomString('社区'),
                town: {
                  id: randomNumber(),
                  name: randomString('乡镇'),
                  pinyin: randomString('pinyin'),
                } as Town
              } as Community,
            } as Village,
          } as Building,
        } as Unit,
        area: randomNumber(80) + 30,
        lowIncoming: false,
        relief: false,
        remarks: randomString('备注'),
        name: randomString('名字'),
        owner: {
          id: randomNumber(),
          name: randomString('户主'),
          phone: randomString('电话号码')
        } as Resident,
        residents: [
          {name: randomString('居住人员1')} as Resident,
          {name: randomString('居住人员2')} as Resident
        ] as Resident[],
        checkInTime: dateTime.valueOf() - randomNumber() * 1234567,
        type: randomNumber(2),
        grider: null
      } as House

      // 随机添加网格员
      if (randomBoolean()) {
        house.grider = {
          id: randomNumber(10),
          webUser: {
            name: randomString('姓名')
          }
        } as Grider;
      }
      houses.push(house);
    }
    return houses;
  }

  getInjectors(): ApiInjector[] {
    return [
      {
        url: this.baseUrl + '/addGrider/(\\d+)',
        description: '为某个房屋添加网格员',
        method: 'POST',
        result: (matchers, options: {params: HttpParams}) => {
          Assert.isInteger(+options.params.get('griderId'), '接收到的网格员ID类型不正确');
        }
      },
      {
        description: 'save',
        url: this.baseUrl,
        method: 'POST',
        result: (matchers, options: {body: House}) => {
          const house = options.body;
          Assert.isDefined(
            house.floor,
            house.name,
            house.type,
            house.area,
            house.lowIncoming,
            house.relief,
            house.checkInTime,
            house.remarks,
            house.unit,
            this.name + 'some properties not defined');

          Assert.isInteger(house.unit.id, this.name + 'unit.id must be int');

          house.id = randomNumber(123);
          return house;
        }
      },
      {
        description: 'saveAll',
        url: this.baseUrl + '/saveAll',
        method: 'POST',
        result: (matchers, options: {body: House[]}) => {
          const houses = options.body;
          Assert.isArray(houses, this.name + 'houses must be array');
          houses.forEach(house => {
            Assert.isDefined(house.name, house.floor, house.unit, house.weight, this.name + 'house validate fail');
            Assert.isInteger(house.unit.id, this.name + 'house.unit.id must be int');
            house.unit = {id: house.unit.id} as Unit;
          });

          return houses;
        }
      },
      {
        url: this.baseUrl + '/page',
        description: 'page 分页查询',
        method: 'GET',
        result: (urlMatches: (string)[], options: {params: HttpParams;}) => {
          const params = options.params as HttpParams;
          const page = +params.get('page');
          const size = +params.get('size');
          // 参数校验
          Assert.isNotNullOrUndefined(page, size, self.name + ' page,size为必选');
          Assert.isDefined(params.get('owner'), self.name + ' 选填参数未添加全');
          // 设置初始时间模拟（当前时间）
          const dateTime = new Date();
          const beginId = page * size;

          return {
            content: this.getHouses(size, beginId, dateTime), number: page, size, totalElements: 40 + randomNumber()
          } as Page<House>;
        }
      },
      {
        url: this.baseUrl + '/pageOfCurrentGrider',
        description: 'pageOfCurrentGrider 分页查询当前网格员管理的住房',
        method: 'GET',
        result: (urlMatches: (string)[], options: {params: HttpParams;}) => {
          const params = options.params as HttpParams;
          const page = params.get('page') ? +params.get('page') : 0;
          const size = params.get('size') ? +params.get('size') : 20;
          // 设置初始时间模拟（当前时间）
          const dateTime = new Date();
          const beginId = page * size;
          return {
            content: this.getHouses(size, beginId, dateTime), number: page, size, totalElements: 40 + randomNumber()
          } as Page<House>;
        }
      },
      {
        method: 'DELETE',
        description: 'deleteById  删除房屋',
        url: `${this.baseUrl}/(\\d+)`
      },
      {
        method: 'GET',
        url: `${this.baseUrl}/(\\d+)`,
        description: 'getById: 获取指定ID的房屋',
        result: (urlMatches: Array<string>) => {
          // 使用 + 完成字符串向数字的转换
          const id = +urlMatches[1];
          Assert.isInteger(id, 'id类型必须为number');

          return HouseApi.getOneHouse(id);
        }
      },
      {
        method: 'PUT',
        description: 'updateName: 更新房子的门牌号',
        url: `${this.baseUrl}/updateName/(\\d+)`,
        result: (urlMatches: (string)[], option: {
          body: House;
        }) => {
          const id = +urlMatches[1];
          Assert.isInteger(id, 'id must be integer');

          const body = option.body;
          Assert.isString(body.name, 'name must be string');
          Assert.isNumber(
            id, 'id must be number'
          );
          return {} as House;
        }
      },
      {
        description: 'update: 更新房子的性质、面积、是否保障性住房，房屋补贴、入住时间等基础字段、备注,author:panjie',
        url: `${this.baseUrl}/(\\d+)`,
        method: 'PUT',
        result: (urlMatches: (string)[], option: {
          body: House;
        }) => {
          const house = option.body;

          return {
            ...house,
            ...{
              id: +urlMatches[1],
            }
          }
        }
      },
      {
        url: `${this.baseUrl}/getAllByBuildingId/(\\d+)`,
        description: 'getAllByBuildingId: 返回某个楼的所有的住房信息: panjie',
        result: () => {
          const units = [] as Unit[];
          for (let i = 0; i < 3; i++) {
            units.push({name: randomString('单元名称')} as Unit);
          }

          const houses = [] as House[];
          for (let i = 0; i < 40; i++) {
            houses.push({
              id: i + 1,
              name: randomString('住房'),
              unit: units[randomNumber() % 3]
            } as House)
          }

          return houses;
        }
      },
      {
        method: 'PATCH',
        url: `${this.baseUrl}/removeByCurrentGrider/(\\d+)`,
        description: 'removeByCurrentGrider 由当前网格员身上移除其管理的房屋'
      },
      {
        method: 'DELETE',
        url: this.baseUrl + '/removeGrider/(\\d+)',
        description: 'removeGrider 移除某个住房上的网格员'
      },
      {
        method: 'PATCH',
        url: `${this.baseUrl}/updateOwner/(\\d+)`,
        description: 'updateOwner: 更新住户的户主：' +
          '1. 查询房子信息.' +
          '2. 如果isOwner为true，使用residentId来设置房子户主后保存' +
          '3. 如果isOwner为false，判断residentId是否是原户主：是，删除户主；不是：什么也不做',
        result: (matchers: string[], options: {body: {residentId: number, isOwner: boolean}}) => {
          const houseId = +matchers[1];
          const body = options.body;
          Assert.isNumber(body.residentId, '户主ID不是number');
          Assert.isTrue(typeof body.isOwner === 'boolean', '是否户主必须为boolean类型');
          console.log('更新住户的户主', houseId, body);
          return;
        }
      },
      {
        method: 'DELETE',
        url: this.baseUrl + '/batchRemoveGrider',
        description: 'batchRemoveGrider 批量移除网格员',
        result: ((urlMatches: any, options: RequestOptions) => {
          const httpParams = options.params as HttpParams;
          const ids = httpParams.getAll('ids');
          Assert.isArray(ids, '未接收到ids');
        })
      }
    ];
  }
}
