import {User} from './user';

/**
 * 工作
 */
export interface Job {
  /**
   * 内容
   */
  content: string;
  createTime: number;
  createUser: User;
  /**
   * 结束日期
   */
  endDate: number;
  id: number;
  /**
   * 来源
   */
  origin: string;
  /**
   * 摘要
   */
  summary: string;
  /**
   * 标题
   */
  title: string;

  /**
   * 权重，越小越靠前
   */
  weight: number;
}
