import {HouseOwnType} from './enum/house-own-type';
import {Unit} from './unit';
import {Resident} from './resident';
import {Grider} from './grider';

/**
 * 住房
 * 使用接口来替换Class
 * 此方法更符合实际的情况
 * @author panjie
 */
export interface House {
  /**房屋面积*/
  area: number;
  /**
   * 入住时间
   */
  checkInTime: number;
  /**
   * 第几层（层数）
   */
  floor: number;
  /**
   * 网格员
   */
  grider: Grider;

  id: number;

  /**是否保障性住房*/
  lowIncoming: boolean;
  /**
   * 门牌号
   */
  name: string;
  /**
   * 偏移量
   * 距离上一住宅的距离
   */
  offset: number;
  /**房主*/
  owner: Resident;
  /**是否减免房屋补贴住房*/
  relief: boolean;
  /**备注*/
  remarks: string;
  /**居住人员，包含房主*/
  residents: Resident[];
  /**
   * 使用性质
   */
  type: HouseOwnType;
  /**
   * 所处的单元（楼房）或是排（平房）
   */
  unit: Unit;
  /**
   * 用于排序的权重
   * 越小越靠前
   */
  weight: number;
  /**
   * 宽度
   * 用于平房宽度不同时对齐、控制生成模型的宽度
   * 用于生成楼房模型时，不同的住房占据不同的宽度
   */
  width: number;
  /**
   * 是否选中
   */
  _checked: boolean;
}
