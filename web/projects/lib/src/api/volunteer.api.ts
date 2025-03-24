import {ApiInjector, MockApiInterface} from '@yunzhi/ng-mock-api';
import {HttpParams} from '@angular/common/http';
import {Assert, randomBoolean, randomNumber, randomString, randomTimestamp} from '@yunzhi/utils';
import {Page} from '@yunzhi/ng-common';
import {Volunteer} from '../entity/volunteer';
import {WechatUser} from '../entity/wechat-user';
import {VolunteerActivitySignUp} from '../entity/volunteer-activity-sign-up';
import {EducationType} from '../entity/enum/education-type';


/**
 * 志愿者mockApi
 */
export class VolunteerApi implements MockApiInterface {
  private baseUrl = 'volunteer';

  getInjectors(): ApiInjector[] {
    return [
      {
        method: 'GET',
        url: `${this.baseUrl}/page`,
        description: 'page: 在志愿者页面显示信息',
        result: (urlMatches: any, options: {params: HttpParams;}) => {
          const params = options.params as HttpParams;
          console.log('接受的参数为：', params);
          const page = +params.get('page');
          const size = +params.get('size');
          // 参数校验
          Assert.isNumber(page, size, 'page,size为必选');
          Assert.isDefined(params.get('name'), self.name + '选填参数未添加全');

          // 构建返回数据
          const beginId = page * size;
          const volunteers = new Array<Volunteer>();
          for (let i = 0; i < +size; i++) {
            const volunteer = {
              id: beginId + i + 1,
              wechatUser: {
                name: randomString('名字'),
                mobile: randomString('手机号'),
                address: randomString('联系地址'),
                sex: randomBoolean(),
                education: randomNumber(4),
                birthday: randomTimestamp(10, new Date(2020, 7, 12))
              } as WechatUser,
              beStar: false,
              weight: null,
              volunteerActivitySignUps: [],
            } as Volunteer;
            const activityCount = randomNumber(2) + 1;
            for (let j = 0; j < activityCount; j++) {
              volunteer.volunteerActivitySignUps.push({
                id: randomNumber(),
                volunteerActivity: {
                  name: randomString('参与活动')
                }
              } as VolunteerActivitySignUp);
            }
            volunteers.push(volunteer);
          }
          return {
            content: volunteers, number: page, size, totalElements: 40 + randomNumber()
          } as Page<Volunteer>;
        }
      },
      {
        url: this.baseUrl + '/getCurrentVolunteer',
        result: {
          id: randomNumber(),
          phone: randomString('phone'),
          name: randomString('name'),
          volunteerActivity: {
            name: randomString('参与活动')
          },
          wechatUser: {
            birthday: 20211232,
            name: randomString('姓名'),
            address: randomString('address'),
            mobile: randomString('13921231233'),
            education: 1
          }
        }
      },
      //设置排名
      {
        method: 'POST',
        url: `${this.baseUrl}/updateWeight/(\\d+)`,
        result: (matchers, options: {body: Volunteer}) => {
          const volunteer = options.body;
          Assert.isDefined(volunteer.weight, volunteer.id, volunteer.beStar + 'volunteer validate fail');
          volunteer.beStar = true;
          return volunteer;
        }
      },
      //取消明星
      {
        method: 'POST',
        url: `${this.baseUrl}/cancelStar/(\\d+)`
      },
      {
        url: this.baseUrl + '/getAllVolunteerStars',
        result: () => {
          const volunteerStars = [] as Volunteer[];
          for (let i = 0; i < 10; i++) {
            const volunteerStar = {
              wechatUser: {
                name: randomString('姓名'),
                introduction: randomString('介绍'),
                education: randomNumber(4) as EducationType
              }
            } as Volunteer;
            volunteerStars.push(volunteerStar);
          }
          return volunteerStars;
        }
      },
      {
        method: 'GET',
        url: `${this.baseUrl}/volunteerStars`,
        description: '获取志愿者明星',
        result: () => {
          const volunteerStars = [] as Volunteer[];
          for (let i = 0; i < 10; i++) {
            const volunteerStar = {
              wechatUser: {
                name: randomString('姓名'),
                introduction: randomString('介绍')
              }
            } as Volunteer;
            volunteerStars.push(volunteerStar);
          }
          return volunteerStars;
        }
      },
      {
        url: this.baseUrl + '/existsByCurrentWechatUser',
        description: 'existsByCurrentWechatUser 当前登录用户是否已经是志愿者',
        result: () => {
          return randomBoolean();
        }
      },
      {
        method: 'POST',
        description: 'save: 新增志愿者',
        url: this.baseUrl,
        result: (urlMatches: any, options: {body: Volunteer;}) => {
          let body = {} as Volunteer;
          if (options) {
            body = options.body;
          }
          // 断言传入的数据不为空
          Assert.isDefined(
            body.wechatUser,
            'must be defined');
          Assert.isNumber(
            body.wechatUser.sex,
            body.wechatUser.education,
            body.wechatUser.birthday,
            'must be number');
          Assert.isString(body.wechatUser.address, 'address must be string');
          // 构造返回数据
          return {
            id: randomNumber(),
            wechatUser: body.wechatUser,
          } as Volunteer;
        }
      },
    ];
  }
}
