import {ApiInjector, MockApiInterface, randomString} from '@yunzhi/ng-mock-api';
import {Resident} from '../entity/resident';
import {Assert, randomBoolean, randomNumber} from '@yunzhi/utils';
import {HttpParams} from '@angular/common/http';
import {Page} from '@yunzhi/ng-common';
import {ReligiousBelief} from '../entity/religious-belief';
import {House} from '../entity/house';
import {DistrictApi} from './district.api';
import {Observable} from 'rxjs';


/**
 * 居民
 */
export class ResidentApi implements MockApiInterface {
  private url = 'resident';

  /**
   * 通过ID\身份证号获取一个居民
   * @param id
   * @param idNumber
   */
  static getByIdAndIdNumber(id: number, idNumber: string) {
    return {
      id,
      accountNumber: '23',
      beChronicDisease: false,
      beCrimed: false,
      beCultMember: false,
      beDisabled: false,
      beDisabledSolider: false,
      beEmptyNest: false,
      beEndowmentInsurance: false,
      beEnterToWar: false,
      beFloating: false,
      beLeftBehindChildren: false,
      beLetterImitationPeople: false,
      beLonelyOrWidowed: false,
      beMedicalInsurance: false,
      beNuclear: false,
      beOldAgeAllowance: false,
      beSoldier: false,
      beStudent: false,
      beSubsistenceAllowances: false,
      beVolunteer: false,
      chronicDiseaseDetails: '',
      crimedTypes: [],
      cult: {id: 12, name: ''},
      enterprise: null,
      domicilePlace: '',
      education: 0,
      employmentStatus: 0,
      floatedDate: null,
      floatedPlace: '',
      houses: [
        {
          id: 2,
          checkInTime: null,
          floor: 1,
          name: '201',
          offset: 0,
          area: 0,
          lowIncoming: false,
          relief: false,
          remarks: '',
          type: 0,
          unit: {
            id: 1,
            building: {
              id: 5,
              name: 'jie panjie',
              pinyin: null,
              housesLengthOfFloor: 3,
              horizontalOffset: 12,
              maxFloor: 12,
              houseType: 1,
              unitCount: 3,
              verticalOffset: 12,
              village: {
                id: 4,
                name: '12312312',
                pinyin: '123',
                longitude: 0,
                latitude: 0,
                establishTime: 1631836800000,
                houseType: 0,
                community: {
                  id: 3,

                  name: '21',
                  pinyin: '123',
                  town: {
                    id: 2,

                    name: '12312312',
                    pinyin: '213'
                  }
                }
              }
            },
            name: '1单元',
            weight: 0
          },
          weight: 0,
          width: 0
        }
      ],
      idNumber,
      letterImitationContent: '',
      localDomicile: true,
      maritalStatus: 0,
      name: '123',
      nationality: 1,
      phone: '13333333333',
      politicalClimate: 0,
      religion: null,
      religiousBelief: null,
      remarks: '',
      school: '',
      schoolAddress: '',
      sex: null,
      workPlace: '',
      skills: [],
      jobTypeRequirements: [],
      beVaccinated: null,
      vaccinatedPlace: 'xxx医院',
      notVaccinatedReason: '',
    } as Resident;
  }

  /**
   * 校验保存和新增居民的数据
   * @param resident 居民
   */
  static validateSaveAndPostBasicData(resident: Resident): void {
    Assert.isDefined(resident, '未接收到请求主体');
    Assert.isDefined(
      resident.accountNumber,
      resident.beChronicDisease,
      resident.beCrimed,
      resident.beCultMember,
      resident.beDisabled,
      resident.beDisabledSolider,
      resident.beEmptyNest,
      resident.beEndowmentInsurance,
      resident.beEnterToWar,
      resident.beFloating,
      resident.beLeftBehindChildren,
      resident.beLetterImitationPeople,
      resident.beLonelyOrWidowed,
      resident.beMedicalInsurance,
      resident.beNuclear,
      resident.beOldAgeAllowance,
      resident.beSoldier,
      resident.beStudent,
      resident.beSubsistenceAllowances,
      resident.beVolunteer,
      resident.chronicDiseaseDetails,
      resident.crimedTypes,
      resident.domicilePlace,
      resident.education,
      resident.enterprise,
      resident.employmentStatus,
      resident.floatedDate,
      resident.floatedPlace,
      resident.idNumber,
      resident.letterImitationContent,
      resident.localDomicile,
      resident.maritalStatus,
      resident.name,
      resident.nationality,
      resident.phone,
      resident.politicalClimate,
      resident.remarks,
      resident.school,
      resident.schoolAddress,

      resident.workPlace,
      // todo: resident.religiousBelief,
      '接收到的居民属性不全');
    Assert.isArray(resident.jobTypeRequirements, resident.skills, '数组验证错误');
  }

  getInjectors(): ApiInjector[] {
    return [{
      method: 'PATCH',
      url: `${this.url}/addHouseIfNotExist/(\\d+)`,
      description: 'addHouseIfNotExist 为居民添加住房',
      result: (matchers: string[], options: {params: HttpParams}) => {
        // 居民ID
        const id = +matchers[1];
        const params = options.params;
        Assert.isTrue(params.has('houseId'), '参数中未获取到houseId');

        // 房屋ID
        const houseId = params.get('houseId');
        console.log('居民ID', id, '住房ID', houseId);
        return;
      }
    },
      {
        method: 'POST',
        url: this.url,
        description: 'save 新增居民:' +
          '注意：未向后台传性别、年龄、生日信息。' +
          '其中：' +
          '1. 性别： 后台根据身份证号自动计算,' +
          '2. 生日：后台根据身份证号自动计算' +
          '3. 年龄： 后台不需要存该信息' +
          '4. 后台还需要根据身份证号在后台存出生日期字段，前台发起年龄的查询的时，后台实现查的是出生日期' +
          '5. 工作单位以及宗教信仰传入的实体可能有ID，也可能没有ID。' +
          '5.1 如果有ID，直接按ID存实体；如果没有ID，则按name查询实体，查的到存实体，查不到新建一个实体。' +
          '6. 学校也应该这么搞，看后期有没有时间',
        result: (urlMatcher: any, options: {body: Resident}) => {
          const resident = options.body;
          ResidentApi.validateSaveAndPostBasicData(resident);
          return {...resident, ...{id: randomNumber()}};
        }
      },
      {
        method: 'POST',
        url: this.url + '/updateAll',
        description: 'updateAll',
        result: []
      },
      {
        url: this.url + '/exportExcel',
        description: 'exportExcel 导出数据到EXCEL',
        result: () => {
          // 返回文件的MockApi还没有处理好，所以在组件中没有正常的接收到值
          return new Observable(subscriber => {
            const result = new Blob(['123', '343']);
            subscriber.next(result);
            subscriber.complete();
          });
        }
      },
      {
        method: 'PUT',
        url: this.url + '/(\\d+)',
        description: 'update 更新居民基础信息:' +
          '具体在字段上的特殊处理请参考：新增居民',
        result: (matchers: string[], options: {body: Resident}) => {
          const resident = options.body;
          const id = +matchers[1];
          Assert.isNumber(id, 'id must be number');
          ResidentApi.validateSaveAndPostBasicData(resident);
          return {...resident};
        }
      }, {
        method: 'GET',
        url: `${this.url}/page`,
        description: 'page 分页查询',
        result: (urlMatches: (string)[], options: {params: HttpParams;}) => {
          const params = options.params as HttpParams;
          const page = +params.get('page');
          const size = +params.get('size');
          Assert.isInteger(page, size, 'page, size为必选');
          Assert.isDefined(params.get('idNumber'), 'idNumber选填参数未添加全');
          Assert.isDefined(params.get('phone'), 'phone选填参数未添加全');
          Assert.isDefined(params.get('name'), 'name选填参数未添加全');
          Assert.isDefined(params.get('politicalClimate'), 'politicalClimate选填参数未添加全');
          Assert.isDefined(params.get('education'), 'education选填参数未添加全');
          Assert.isDefined(params.get('religion'), 'religion选填参数未添加全');
          Assert.isDefined(params.get('workPlace'), 'workPlace选填参数未添加全');
          Assert.isDefined(params.get('regionId'), 'regionId选填参数未添加全');
          Assert.isDefined(params.get('beginAge'), 'beginAge选填参数未添加全');
          Assert.isDefined(params.get('endAge'), 'endAge选填参数未添加全');
          Assert.isDefined(params.get('nationality'), 'nationality选填参数未添加全');
          Assert.isDefined(params.get('sex'), 'sex选填参数未添加全');

          return {
            content: this.getResidents(page, size), number: page, size, totalElements: 40 + randomNumber()
          } as Page<Resident>;
        }
      }, {
        method: 'GET',
        url: `${this.url}/pageOfCurrentGrider`,
        description: 'pageOfCurrentGrider 当前网格员管理的居民',
        result: (urlMatches: (string)[], options: {params: HttpParams;}) => {
          const params = options.params as HttpParams;
          const page = params.get('page') === null ? 0 : +params.get('page');
          const size = params.get('size') === null ? 20 : +params.get('size');

          return {
            content: this.getResidents(page, size), number: page, size, totalElements: 40 + randomNumber()
          } as Page<Resident>;
        }
      }, {
        method: 'DELETE',
        url: `${this.url}/(\\d+)`,
        description: 'deleteById: 这个删除操作比较有意思，它在后台的处理过程并不是真正的删除数据，也是执行以下逻辑：' +
          '1. 查找该居民的住房情况' +
          '2. 查找当前用户的所有区域' +
          '3. 按情况移除居民与住房的关系。' +
          '举个例子：' +
          '张三有3处住房，位于：天津、天津北辰区及河北省' +
          '当前操作用户为李四，李四所在的区域为天津' +
          '则将移除天津、天津北辰的两处关系，最终张三的住房为：河北省'
      },
      {
        url: `${this.url}/(\\d+)`,
        description: 'getById',
        result: (urlMatches: String[]) => {
          const id = +urlMatches[1];
          return ResidentApi.getByIdAndIdNumber(id, '510103196502083435');
        }
      }, {
        url: `${this.url}/getByIdNumber/(\\S+)`,
        description: 'getByIdNumber 通过身份证号获取居民',
        result: (urlMatchers: string[]) => {
          const idNumber = urlMatchers[1];
          if (randomNumber() % 2 === 0) {
            return ResidentApi.getByIdAndIdNumber(randomNumber(10), idNumber);
          }
          return null;
        }
      }, {
        method: 'DELETE',
        url: `${this.url}/removeHouse/(\\d+)`,
        description: 'removeHouse 移除居民上的住房信息(社区管理人员及该居民的网格员均拥有相关权限)',
        result: (urlMatchers, option: {params: HttpParams}) => {
          Assert.isTrue(option.params.has('houseId'), '未接收到houseId');
          const houseId = +option.params.get('houseId');
          console.log('removeHouse', houseId);
        }
      }, {
        method: 'GET',
        url: `${this.url}/getAllByLoginUserDistrict`,
        description: '根据当前登陆用户获取区域内的居民',
        result: (urlMatches: (string)[]) => {
          let residents = new Array<Resident>();
          for (let i = 0; i < 100; i++) {
            const resident = {
              id: i + 1,
              name: randomString('name'),
              idNumber: '******19980515**00',
              sex: randomBoolean(),
              phone: '139****0000',
              religiousBelief: {
                id: randomNumber(),
                name: randomString()
              } as ReligiousBelief,
              education: randomNumber(6),
              politicalClimate: randomNumber(6),
              workPlace: randomString('workPlace'),
              houses: [],
              beVaccinated: randomBoolean() ? null : randomBoolean(),
              notVaccinatedReason: randomString('未找疫苗的原因'),
              vaccinatedPlace: randomString('打疫苗的地点'),
              nationality: randomNumber(),
            } as Resident;

            const houseCount = randomNumber(2) + 1;
            for (let j = 0; j < houseCount; j++) {
              resident.houses.push({
                id: randomNumber(),
                name: '301',
                unit: {
                  name: randomString('三单元'),
                  building: {
                    name: randomString('一号楼'),
                    id: DistrictApi.getCounty().towns[0].communities[0].villages[0].buildings[0].id,
                    village: {
                      name: randomString('平安小区'),
                      community: {
                        name: randomString('社区'),
                        town: {
                          name: randomString('乡镇'),
                        }
                      }
                    }
                  }
                }
              } as House);
            }

            residents.push(resident);
          }

          return residents;
        }
      }, {
        url: this.url + '/getVaccinationCache',
        description: '查出当前登陆用户区域的接种情况',
        result: (urlMatchers: string[], option: {params: HttpParams}) => {
          const vaccinated = randomNumber();
          const total = randomNumber() + vaccinated;
          return {vaccinated: vaccinated, total: total};
        }
      }
    ];
  }

  getResidents(page: number, size: number): Resident[] {
    let residents = new Array<Resident>();
    for (let i = 0; i < +size; i++) {
      const resident = {
        id: i + 1,
        name: randomString('name'),
        idNumber: '******19980515**00',
        sex: randomBoolean(),
        phone: '139****0000',
        religiousBelief: {
          id: randomNumber(),
          name: randomString()
        } as ReligiousBelief,
        education: randomNumber(6),
        politicalClimate: randomNumber(6),
        workPlace: randomString('workPlace'),
        houses: [],
        beVaccinated: randomBoolean() ? null : randomBoolean(),
        notVaccinatedReason: randomString('未找疫苗的原因'),
        vaccinatedPlace: randomString('打疫苗的地点'),
        nationality: randomNumber(),
        encodedPhone: '139****0000',
        encodedIdNumber: '******19980515**00'
      } as Resident;

      const houseCount = randomNumber(2) + 1;
      for (let j = 0; j < houseCount; j++) {
        resident.houses.push({
          id: randomNumber(),
          name: '301',
          grider: {
            id: randomNumber(),
            webUser: {
              name: randomString('网格员姓名')
            }
          },
          unit: {
            name: randomString('三单元'),
            building: {
              name: randomString('一号楼'),
              id: DistrictApi.getCounty().towns[0].communities[0].villages[0].buildings[0].id,
              village: {
                name: randomString('平安小区'),
                community: {
                  name: randomString('社区'),
                  town: {
                    name: randomString('乡镇'),
                  }
                }
              }
            }
          }
        } as House);
      }

      residents.push(resident);
    }

    return residents;
  }

}

