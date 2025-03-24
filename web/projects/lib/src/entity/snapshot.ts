/**
 * 快照.
 * @author panjie
 */
export class Snapshot {
  id?: number;

  /**
   * 日期.
   */
  createTimestamp?: number;

  /**
   * 总数.
   */
  totalNumber?: number;

  constructor(data?: { id?: number, createTimestamp?: number, totalNumber?: number }) {
    if (data) {
      this.id = data.id;
      this.createTimestamp = data.createTimestamp;
      this.totalNumber = data.totalNumber;
    }
  }
}
