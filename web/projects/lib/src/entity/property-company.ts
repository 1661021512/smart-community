import {Village} from "./village";

/**
 * 物业公司
 */
export interface PropertyCompany {
  id: number;
  /**
   * 物业公司名称
   */
  name: string;
  /**
   * 法人
   */
  legalPerson: string;
  /**
   * 联系人
   */
  contacts: string;
  /**
   * 联系电话
   */
  phone: string;
  /**
   * 负责小区
   */
  villages: Village[]
  /**
   * 综合评分
   */
  score: number;
  /**
   * 综合评分排名
   */
  scoreRank: number;
  /**
   * 及时响应率
   */
  timelyResponseRate: number;
  /**
   * 注册时间
   */
  createTime: number;
  /**
   * 备用联系人
   */
  alternateContact: string;
  /**
   * 备用联系电话
   */
  alternatePhone: string;
  /**
   * 公司地址
   */
  address: string;
}
