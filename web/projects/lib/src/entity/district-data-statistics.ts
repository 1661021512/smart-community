import {District} from './district';

/**
 * 区域数据统计
 */
export interface DistrictDataStatistics {
  /**
   * covid19疫苗接种数量
   */
  covid19DefensedCount: number;
  /**
   * 区域
   */
  district: District;

  /**
   * 房屋数量
   */
  houseCount: number;

  id: number;

  /**
   * 党员数量
   */
  partyMemberCount: number;

  /**
   * 居民数量
   */
  residentCount: number;
}
