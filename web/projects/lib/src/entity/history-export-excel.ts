/**
 * 历史导出列表实体类
 */
export class HistoryExportExcel {
  id: number;

  /**
   * 创建时间
   */
  createTime: number;
  /**
   * 文件名
   */
  filename: string;

  /**
   * 状态
   */
  status: boolean;
}
