import {User} from './user';
import {Attachment} from './attachment';

/**
 * 通知公告
 */
export interface Notice {
  content: string;
  createTime: number;
  createUser: User;
  id: number;
  /**
   * 图片
   */
  image: Attachment;

  /**
   * 副标题
   */
  subTitle: string;
  /**
   * 摘要
   */
  summary: string;
  title: string;
  /**
   * 权重，越小越靠前
   */
  weight: number;
}
