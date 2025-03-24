import {Town} from './town';
import {District} from './district';
import {DISTRICT_TYPE} from './enum/district-type';
import {Attachment} from './attachment';

/**
 * 县
 */
export class County extends District {
  /**乡镇*/
  towns: Town[];

  constructor(data = {} as {
    id?: number,
    name?: string,
    pinyin?: string,
    geoJson?: Attachment,
    secondaryGeoJson?: Attachment,
    towns?: Town[]}) {
    super({
      id: data.id,
      name: data.name,
      geoJson: data.geoJson,
      secondaryGeoJson: data.secondaryGeoJson,
      pinyin: data.pinyin,
      type: DISTRICT_TYPE.county.value
    });
    this.id = data.id;
    this.name = data.name;
    if (Array.isArray(data.towns)) {
      this.towns = data.towns.map(value => value instanceof Town ? value : new Town(value));
    } else {
      this.towns = data.towns;
    }

    super.children = this.towns;
  }

}
