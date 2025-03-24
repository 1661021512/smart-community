import {WechatUser} from './wechat-user';
import {VolunteerActivitySignUp} from './volunteer-activity-sign-up';

/**
 * 志愿者
 */
export interface Volunteer {
  /**
   * 是否为明星
   */
  beStar: boolean;

  createTime: number;
  /**
   * 志愿者id
   */
  id: number;
  /**
   * 电话号码
   */
  phone: string;

  /**
   * 参与活动
   */
  volunteerActivitySignUps: Array<VolunteerActivitySignUp>;
  /**
   * 用户信息
   */
  wechatUser: WechatUser;
  /**
   * 排名
   */
  weight: number;
}
