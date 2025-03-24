import {ApiInjector, MockApiInterface} from '@yunzhi/ng-mock-api';
import {HttpParams} from '@angular/common/http';
import {Assert, randomNumber, randomString} from '@yunzhi/utils';
import {VolunteerActivity} from 'projects/lib/src/entity/volunteer-activity';
import {generatePage, Page} from '@yunzhi/ng-common';
import {Attachment} from '../entity/attachment';
import {Activity_Scale} from 'projects/lib/src/entity/enum/activity-scale';
import {UrlMatcher} from '@angular/router';
import {VolunteerActivitySignUp} from '../entity/volunteer-activity-sign-up';

/**
 * 志愿者活动管理mockApi
 */
export class VolunteerActivityApi implements MockApiInterface {
  private baseUrl = 'volunteerActivity';

  getInjectors(): ApiInjector[] {
    return [
      {
        method: 'POST',
        url: `${this.baseUrl}/add`,
        description: 'save 新增志愿者活动',
        result: (urlMatches: any, option: {body: VolunteerActivity}) => {
          const body = option.body;
          Assert.isString(
            body.name,
            body.contact,
            body.place,
            body.detail,
            'type of some properties must be string');
          Assert.isNumber(
            body.endDate,
            body.numberOfPlanned,
            'type of some properties must be number');

          return {
            id: randomNumber(),
            name: body.name,
            endDate: body.endDate,
            contact: body.contact,
            place: body.place,
            numberOfPlanned: body.numberOfPlanned,
            detail: body.detail,
            image: body.image
          } as VolunteerActivity
        }
      },
      {
        method: 'GET',
        url: `${this.baseUrl}`,
        result: () => {
          return;
        }
      },
      {
        method: 'GET',
        url: `${this.baseUrl}/page`,
        description: 'page: 在志愿者活动管理分页面显示信息',
        result: (urlMatches: any, options: {params: HttpParams;}) => {
          const params = options.params as HttpParams;
          console.log('接受的参数为：', params);
          const page = +params.get('page');
          const size = +params.get('size');
          const name = +params.get('name');
          // 参数校验
          Assert.isNumber(page, size, 'page,size为必选');
          Assert.isDefined(name, self.name + '选填参数未添加全');

          // 构建返回数据
          const beginId = page * size;
          const volunteerActivities = new Array<VolunteerActivity>();
          // 设置初始时间模拟（当前时间）
          const dateTime = new Date();
          for (let i = 0; i < +size; i++) {
            volunteerActivities.push({
              id: beginId + i + 1,
              name: randomString('活动'),
              endDate: dateTime.valueOf() + randomNumber() * 12345,
              contact: randomString('联系人'),
              place: randomString('地点'),
              numberOfPlanned: randomNumber(500),
              numberOfAudited: randomNumber(300),
              numberOfApplicants: randomNumber(400),
            } as VolunteerActivity);
          }
          return {
            content: volunteerActivities, number: page, size, totalElements: 40 + randomNumber()
          } as Page<VolunteerActivity>;
        }
      },
      {
        url: this.baseUrl + '/(\\d+)',
        description: 'getById',
        result: (urlMatches: any) => {
          const id = +urlMatches[1];
          Assert.isTrue(Number.isInteger(id), 'id must be number');
          return {
            id,
            name: randomString('活动'),
            startDate: randomNumber(),
            endDate: randomNumber(9999999999999),
            initiator: randomString('姓名'),
            contact: randomString('姓名'),
            place: randomString('地点'),
            numberOfPlanned: 20,
            numberOfApplicants: 10,
            numberOfAudited: randomNumber(20),
            state: randomNumber(2),
            scale: Activity_Scale.middle.value,
            detail: randomString('活动详情'),
            signUpInformation: [] as VolunteerActivitySignUp[],
            image: {} as Attachment
          } as VolunteerActivity;
        }
      },
      {
        url: this.baseUrl + '/wechatPage',
        description: '小程序端page分页',
        result: (url: UrlMatcher, options: {params: HttpParams}) => {
          const params = options.params;
          const page = +params.get('page');
          const size = +params.get('size');
          return generatePage(page, size, () => {
            return {
              id: randomNumber(),
              name: randomString('活动名称'),
              numberOfPlanned: 20,
              numberOfApplicants: randomNumber(20),
              endDate: randomNumber(9999999999999)
            } as VolunteerActivity
          });
        }
      }
    ];
  }
}
