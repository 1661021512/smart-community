/**
 * 车辆类型
 */
export class VehicleType {
  id: number;
  /**
   * 车辆类型名称
   */
  name: string;
  /**
   * 权重，用于修改类型先后顺序
   */
  weight: number;

  constructor(data = {} as
    { id?: number; name?: string; weight?: number }) {
    this.id = data.id;
    this.name = data.name;
    this.weight = data.weight;
  }
}
