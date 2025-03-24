import {Community} from './community';
import {District} from './district';
import {County} from './county';
import {DISTRICT_TYPE} from './enum/district-type';
import {Attachment} from './attachment';

/**
 * 乡镇实体类
 */
export class Town extends District {
  /**社区*/
  communities: Community[];
  county: County;
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

  constructor(data = {} as {
    secondaryGeoJson?: Attachment;
    id?: number,
    name?: string,
    pinyin?: string,
    county?: County,
    geoJson?: Attachment,
    communities?: Community[]
  }) {
    super({
      id: data.id,
      geoJson: data.geoJson,
      secondaryGeoJson: data.secondaryGeoJson,
      name: data.name,
      pinyin: data.pinyin,
      type: DISTRICT_TYPE.town.value
    })
    this.id = data.id;
    this.name = data.name;
    this.geoJson = data.geoJson;
    this.pinyin = data.pinyin;
    if (Array.isArray(data.communities)) {
      this.communities = data.communities.map(value => value instanceof Community ? value : new Community(value))
    } else {
      this.communities = [];
    }
    data.county = data.county instanceof County ? data.county : new County(data.county);
    super.parent = this.county;
    super.children = this.communities;
  }
}
