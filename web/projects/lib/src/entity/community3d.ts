/**
 * 社区3D模型实体
 */
export class Community3d {
  /**
   * id
   */
  id: number;

  /**
   * 名称
   */
  name: string;

  constructor(data = {} as {
    id?: number,
    name?: string
  }) {
    this.id = data.id;
    this.name = data.name;
  }
}
