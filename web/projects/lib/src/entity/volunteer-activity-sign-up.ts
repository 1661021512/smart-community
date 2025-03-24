import {Volunteer} from './volunteer';
import {SignUpStatus} from './enum/sign-up-status';
import {VolunteerActivity} from './volunteer-activity';

/**
 * 报名的志愿者信息
 * 用于存储志愿者报名活动时填写的信息
 */
export class VolunteerActivitySignUp {
  /**
   * id
   */
  id: number
  /**
   * 报名状态
   */
  status: SignUpStatus;
  /**
   * 志愿者
   */
  volunteer: Volunteer;
  /**
   * 志愿活动
   */
  volunteerActivity: VolunteerActivity
}
