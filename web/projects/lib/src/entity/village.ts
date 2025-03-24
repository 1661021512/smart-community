import {Community} from './community';
import {HouseType} from './enum/house-type';
import {Model} from './model';
import {Building} from './building';
import {District} from './district';
import {DISTRICT_TYPE} from './enum/district-type';
import {Attachment} from './attachment';

/**
 * 小区实体类
 */
export class Village extends District {
  buildings: Building[];
  /**
   * 社区
   */
  community: Community;
  /**
   * 建立时间
   */
  establishTime: number;
  /**
   * 住房类型
   */
  houseType: HouseType;
  /** id */
  id: number;
  /**
   * 名称
   */
  name: string;
  /**
   * 拼音
   */
  pinyin: string;
  /**
   * 纬度
   */
  latitude: number;
  /**
   * 经度
   */
  longitude: number;
  /**
   * 3d模型
   */
  model: Model;

  /**
   * 构造函数
   * @param data
   */
  constructor(data = {} as {
    secondaryGeoJson?: Attachment;
    buildings?: Building[];
    id?: number,
    name?: string,
    pinyin?: string,
    longitude?: number,
    latitude?: number,
    geoJson?: Attachment,
    houseType?: HouseType,
    establishTime?: number,
    model?: Model,
    community?: Community,
  }) {
    super({
      ...data, ...{
        id: data.id,
        name: data.name,
        pinyin: data.pinyin,
        geoJson: data.geoJson,
        secondaryGeoJson: data.secondaryGeoJson,
        type: DISTRICT_TYPE.village.value
      }
    });
    this.id = data.id;
    this.name = data.name;
    this.pinyin = data.pinyin;
    this.longitude = data.longitude;
    this.latitude = data.latitude;
    this.houseType = data.houseType;
    this.establishTime = data.establishTime;
    if (data.model instanceof Model) {
      this.model = data.model;
    } else {
      this.model = new Model(data.model);
    }
    if (data.community instanceof Community) {
      this.community = data.community;
    } else {
      this.community = new Community(data.community);
    }
    if (Array.isArray(data.buildings)) {
      this.buildings = data.buildings.map(value => value instanceof Building ? value : new Building(value));
    } else {
      this.buildings = [];
    }

    super.parent = this.community;
    super.children = this.buildings;
  }
}
