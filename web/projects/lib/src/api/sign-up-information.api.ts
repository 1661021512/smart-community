import {ApiInjector, MockApiInterface} from '@yunzhi/ng-mock-api';
import {Assert, randomNumber} from '@yunzhi/utils';
import {VolunteerActivitySignUp} from '../entity/volunteer-activity-sign-up';
import {VolunteerActivity} from '../entity/volunteer-activity';

/**
 * 报名信息api
 */
export class SignUpInformationApi implements MockApiInterface {
  private baseUrl = 'signUpInformation';

  getInjectors(): ApiInjector[] {
    return [
      {
        method: 'POST',
        description: 'save: 新增报名信息',
        url: this.baseUrl,
        result: (urlMatches: any, options: {body: VolunteerActivitySignUp}) => {
          let body = {} as VolunteerActivitySignUp;
          if (options) {
            body = options.body;
          }
          // 断言传入的数据不为空
          Assert.isDefined(
            body.volunteer,
            body.volunteerActivity,
            body.volunteer.wechatUser,
            'region must be defined');
          // 构造返回数据
          return {
            id: randomNumber(),
            volunteer: body.volunteer,
            volunteerActivity: body.volunteerActivity as VolunteerActivity,
            status: body.status
          } as VolunteerActivitySignUp;
        }
      },
    ]
  }
}
