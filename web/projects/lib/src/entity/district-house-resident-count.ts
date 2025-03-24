import {District} from './district';

/**
 * 区域住房和居民数量
 */
export interface DistrictHouseResidentCount {
  /**
   * 区域
   */
  district: District;
  /**
   * 住房数量
   */
  houseCount: number;
  /**
   * 居民数量
   */
  residentCount: number;
}
