import {WebUser} from './web-user';

/**
 * 统计信息
 */
export class Statistics {
  /**
   * 创建时间
   */
  createTime: number;
  /**
   * 录入条数
   */
  totalCount: number;
  /**
   * 用户信息
   */
  webUser: WebUser;

  constructor(data = {} as {
    webUser?: WebUser,
    createTime?: number,
    totalCount?: number
  }) {
    if (data) {
      this.webUser = data.webUser;
      this.createTime = data.createTime;
      this.totalCount = data.totalCount;
    }
  }
}
