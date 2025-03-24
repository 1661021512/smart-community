/**
 * 车辆品牌
 */
export class VehicleBrand {
  id: number;
  /**
   * 车辆品牌名称
   */
  name: string;

  constructor(data = {} as { id?: number; name?: string }) {
    this.id = data.id;
    this.name = data.name;
  }
}
