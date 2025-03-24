import {ApiInjector, Assert, MockApiInterface} from "@yunzhi/ng-mock-api";
import {randomNumber, randomString} from "@yunzhi/utils";
import {Village} from '../entity/village';
import {PropertyCompany} from '../entity/property-company';
import {Page} from "@yunzhi/ng-common";
import {HttpParams} from "@angular/common/http";

/**
 * 物业公司Api
 */
export class PropertyCompanyApi implements MockApiInterface {
  protected baseUrl = 'propertyCompany';

  public static getOnePropertyCompany(id = 123) {
    const result = {
      id,
      name: randomString('物业'),
      legalPerson: randomString('法人'),
      contacts: randomString('联系人'),
      phone: '18511112222',
      villages: [
        {
          id: randomNumber(),
          name: randomString('小区'),
        } as Village,
        {
          id: randomNumber(),
          name: randomString('小区'),
        } as Village] as Village[],
      score: randomNumber(100),
      scoreRank: randomNumber(100),
      timelyResponseRate: randomNumber(100),
      createTime: 1631836800000,
      alternateContact: randomString('备用联系人'),
      alternatePhone: '18511113333',
      address: '尚义县解放路101号'
    } as PropertyCompany
    return result;
  }

  getInjectors(): ApiInjector[] {
    return [
      {
        method: 'GET',
        url: `${this.baseUrl}/(\\d+)`,
        description: '根据id获取物业公司',
        result: (urlMatches: Array<string>) => {
          const id = +urlMatches[1];
          return PropertyCompanyApi.getOnePropertyCompany(id);
        }
      },
      {
        method: 'POST',
        url: this.baseUrl,
        description: 'save: 新增物业公司',
        result: (urlMatches: any, option: {
          body: {
            name: string,
            legalPerson: string,
            contacts: string,
            phone: string,
            villages: Village[],
            score: number,
            timelyResponseRate: number,
            alternateContact: string,
            alternatePhone: string,
            createTime: number,
            address: string,
          };
        }) => {
          let body = {} as {
            name: string,
            legalPerson: string,
            contacts: string,
            phone: string,
            villages: Village[],
            score: number,
            timelyResponseRate: number,
            alternateContact: string,
            alternatePhone: string,
            createTime: number,
            address: string,
          };

          if (option) {
            body = option.body;
          }

          return {
            id: randomNumber(),
            name: body.name,
            legalPerson: body.legalPerson,
            contacts: body.contacts,
            phone: body.phone,
            villages: body.villages,
            score: body.score,
            timelyResponseRate: body.timelyResponseRate,
            alternateContact: body.alternateContact,
            alternatePhone: body.alternatePhone,
            createTime: body.createTime,
            address: body.address,
          } as PropertyCompany
        }
      },
      {
        url: this.baseUrl + '/page',
        method: 'GET',
        description: 'page 分页',
        result: (urlMatches: (string)[], options: { params: HttpParams; }) => {
          const params = options.params as HttpParams;
          console.log('接受的参数为：', params);
          const page = +params.get('page');
          const size = +params.get('size');
          // 参数校验
          Assert.isNotNullOrUndefined(page, size, 'page,size为必选');
          Assert.isDefined(params.get('name'), self.name + ' 选填参数未添加全');
          const propertyCompanies = new Array<PropertyCompany>();
          for (let i = 0; i < +size; i++) {
            propertyCompanies.push({
              id: randomNumber(),
              name: randomString('物业'),
              legalPerson: randomString('法人'),
              phone: randomString('电话'),
              contacts: randomString('联系人'),
              score: randomNumber(100),
              scoreRank: randomNumber(100),
              timelyResponseRate: randomNumber(100),
              alternatePhone: randomString('备用电话'),
              alternateContact: randomString('备用联系人'),
              villages: [
                {
                  id: randomNumber(),
                  name: randomString('小区'),
                } as Village,
                {
                  id: randomNumber(),
                  name: randomString('小区'),
                } as Village,
                {
                  id: randomNumber(),
                  name: randomString('小区'),
                } as Village] as Village[],
              createTime: randomNumber()
            } as PropertyCompany);
          }
          return {
            content: propertyCompanies, number: page, size, totalElements: 40 + randomNumber()
          } as Page<PropertyCompany>;
        }
      },
      {
        method: 'DELETE',
        description: 'delete 删除',
        url: `${this.baseUrl}/(\\d+)`
      },
      {
        description: 'update: 更新物业公司',
        url: `${this.baseUrl}/(\\d+)`,
        method: 'PUT',
        result: (urlMatches: (string)[], option: {
          body: PropertyCompany;
        }) => {
          const PropertyCompany = option.body;

          return {
            ...PropertyCompany,
            ...{
              id: +urlMatches[1],
            }
          }
        }
      }

    ]
  }
}
