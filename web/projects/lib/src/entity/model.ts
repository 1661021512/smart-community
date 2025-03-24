/**
 * 3d模型实体
 */
export class Model {
  /** id */
  id: number;

  /**
   * 名称
   */
  name: string;

  constructor(data = {} as {id?: number, name?: string}) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
    }
  }
}
