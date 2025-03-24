import {EducationType} from './enum/education-type';

export class WechatUser {
  /**
   * 联系地址
   */
  address: string;
  /**
   * 生日
   */
  birthday: number;
  /**
   * 受教育程度
   */
  education: EducationType;
  /**
   * id(openid)
   */
  id: string;
  /**
   * 介绍
   */
  introduction: string;
  /**
   * 手机号
   */
  mobile: string;
  /**
   * 姓名
   */
  name: string;
  /**
   * 性别
   */
  sex: boolean;
}
