/**
 * 邪教
 */
export class Cult {
  id: number;
  /**名字（唯一）*/
  name: string;
  /**最后一次的使用时间*/
  lastUsedTime: number;
  constructor(data = {} as { id: number, name: string, lastUsedTime?: number}) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.lastUsedTime = data.lastUsedTime;
    }
  }
}
