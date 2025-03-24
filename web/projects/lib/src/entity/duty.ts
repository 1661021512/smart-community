/**
 * 岗位
 */
import {DistrictType} from "./enum/district-type";

export class Duty {
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

  /**
   * 区域类型
   */
  typeOfDistrict: DistrictType;

  constructor(data = {} as {
    id?: number,
    name?: string,
    weight?: number,
    typeOfDistrict?: DistrictType
  }) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.weight = data.weight;
      this.typeOfDistrict = data.typeOfDistrict;
    }
  }
}
