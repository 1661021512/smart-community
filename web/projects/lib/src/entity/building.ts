import {HouseType} from './enum/house-type';
import {Village} from './village';
import {Unit} from './unit';
import {District} from './district';
import {DISTRICT_TYPE} from './enum/district-type';
import {Attachment} from './attachment';

/**
 * 住宅楼实体类
 * todo: 转换为interface
 */
export class Building extends District {
  /**
   * 水平偏移
   */
  horizontalOffset: number;
  /**
   * 类型
   */
  houseType: HouseType;
  /**
   * 每层户数
   */
  housesLengthOfFloor: number;
  /**
   * 最大层高
   */
  maxFloor: number;
  type = DISTRICT_TYPE.building.value;
  /**
   * 单元数
   */
  unitCount: number;
  /**
   * 包含的单元(楼房）或是排（平房）
   */
  units: Array<Unit>;
  /**
   * 垂直偏移
   */
  verticalOffset: number;
  /**
   * 所属小区
   * @param data
   */
  village: Village;

  constructor(data = {} as {
    id?: number,
    name?: string,
    pinyin?: string,
    geoJson?: Attachment,
    secondaryGeoJson?: Attachment,
    horizontalOffset?: number,
    verticalOffset?: number,
    unitCount?: number,
    maxFloor?: number,
    houseType?: HouseType,
    village?: Village,
    housesLengthOfFloor?: number,
    units?: Unit[]
  }) {
    super({
      id: data.id,
      name: data.name,
      geoJson: data.geoJson,
      pinyin: data.pinyin,
      type: DISTRICT_TYPE.building.value,
      secondaryGeoJson: data.secondaryGeoJson,
    });
    this.id = data.id;
    this.name = data.name;
    this.housesLengthOfFloor = data.housesLengthOfFloor;
    this.horizontalOffset = data.horizontalOffset;
    this.verticalOffset = data.verticalOffset;
    this.unitCount = data.unitCount;
    this.houseType = data.houseType;
    this.maxFloor = data.maxFloor;
    this.village = data.village instanceof Village ? data.village : new Village(data.village);
    if (Array.isArray(data.units)) {
      this.units = [];
      data.units.forEach(unit => this.units.push(unit instanceof Unit ? unit : new Unit(unit)))
    }

    super.children = [];
    super.parent = this.village;
  }
}
