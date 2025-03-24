export interface Content {
  /**
   * 文本内容
   */
  content: string;

  createTime: number;

  id: number;
  /**
   * 关键字，唯一
   */
  keyword: string;
  title: string;
  updateTime: number;
}
