import { District } from "./district";
import { Duty } from "./duty";
import { User } from "./user";

/**
 * 党建管理（党委、支委）实体
 */
export interface PartyBuilding {
  /**
   * 区域
   */
  district: District;
  /**
   * 职务
   */
  duty: Duty;
  /**
   * id
   */
  id: number;
  /**
   * 用户信息
   */
  personName: string;
}
