import {Town} from './town';
import {Village} from './village';
import {District} from './district';
import {DISTRICT_TYPE} from './enum/district-type';
import {Attachment} from './attachment';

/**
 * 社区实体类
 */
export class Community extends District {
  /**
   * 乡镇
   */
  town: Town;
  /**小区*/
  villages: Village[];

  constructor(data = {} as {
    secondaryGeoJson?: Attachment;
    id?: number,
    name?: string,
    pinyin?: string,
    town?: Town,
    geoJson?: Attachment,
    villages?: Village[]
  }) {
    super({
      id: data.id,
      name: data.name,
      geoJson: data.geoJson,
      secondaryGeoJson: data.secondaryGeoJson,
      pinyin: data.pinyin,
      type: DISTRICT_TYPE.community.value
    })
    if (!data) {
      return;
    }
    this.id = data.id;
    this.name = data.name;
    this.pinyin = data.pinyin;
    this.town = data.town instanceof Town ? data.town : new Town(data.town);
    if (Array.isArray(data.villages)) {
      this.villages = data.villages.map(value => value instanceof Village ? value : new Village(value));
    } else {
      this.villages = [];
    }

    super.parent = this.town;
    super.children = this.villages;
  }
}
