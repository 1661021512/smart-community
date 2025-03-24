import {Community} from './community';
import {WebUser} from './web-user';

/**
 * 网格员
 */
export interface Grider {
  /**
   * 所属社区
   */
  community: Community;
  /**
   * 管理户数
   */
  houseCount: number;
  /**
   * 网格员id
   */
  id: number;
  /**
   * 管理居民数
   */
  residentCount: number;
  /**
   * 用户信息
   */
  webUser: WebUser;
}
