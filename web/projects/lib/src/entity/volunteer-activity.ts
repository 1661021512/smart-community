import {Attachment} from './attachment';
import {VolunteerActivitySignUp} from './volunteer-activity-sign-up';

/**
 * 志愿者活动实体
 */

export interface VolunteerActivity {
  /**
   * 联系人
   */
  contact: string;
  /**
   * 活动详情
   */
  detail: string;

  /**
   * 结束日期
   */
  endDate: number;
  /**
   * id
   */
  id: number;
  /**
   * 宣传图片
   */
  image: Attachment;
  /**
   * 发起组织
   */
  initiator: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 已报名人数
   */
  numberOfApplicants: number;
  /**
   * 已审核人数
   */
  numberOfAudited: number;
  /**
   * 计划招募人数
   */
  numberOfPlanned: number;
  /**
   * 地点
   */
  place: string;

  /**
   * 报名信息
   */
  signUpInformation: VolunteerActivitySignUp[];
}
