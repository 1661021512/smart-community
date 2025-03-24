import {DistrictType} from './enum/district-type';
import {Attachment} from './attachment';

/**
 * 区域接口
 */
export class District {
  children: District[];
  /**
   * GEO地图数据
   */
  geoJson: Attachment;
  id: number;
  name: string;
  parent: District;
  pinyin: string;
  /**
   * 辅助地图信息
   */
  secondaryGeoJson?: Attachment;
  /**
   * 区域类型(县、乡镇等）
   * @deprecated
   */
  readonly type: DistrictType;

  constructor(data = {} as {
    children?: District[],
    geoJson?: Attachment,
    secondaryGeoJson?: Attachment,
    id: number, name: string, pinyin: string, parent?: District, type: DistrictType
  }) {
    if (!data) {
      return;
    }
    this.children = data.children;
    this.id = data.id;
    this.geoJson = data.geoJson;
    this.secondaryGeoJson = data.secondaryGeoJson;
    this.name = data.name;
    this.pinyin = data.pinyin;
    this.parent = data.parent;
    this.type = data.type;
  }
}
