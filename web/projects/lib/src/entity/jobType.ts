/**
 * 工作、工种、求职意向
 */
export class JobType {
  id: number;
  /**最后一次的使用时间*/
  lastUsedTime: number;
  name: string;

  constructor(data = {} as
    {id?: number, name?: string, lastUsedTime?: number}) {
    this.id = data.id;
    this.name = data.name;
    this.lastUsedTime = data.lastUsedTime;
  }
}
