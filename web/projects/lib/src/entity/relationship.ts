/**
 * 居民关系实体类
 */

export class Relationship {
  /**
   * id
   */
  id: number;

  /**
   * 名称
   */
  name: string;

  /**
   * 权重
   */
  weight: number;


  constructor(data = {} as {
    id?: number,
    name?: string,
    weight?: number,
  }) {
    this.id = data.id;
    this.name = data.name;
    this.weight = data.weight;
  }
}
