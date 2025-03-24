import {StatusEnum} from './statusEnum';

/**
 * 区域类型
 */
export type DistrictType = 'county' | 'town' | 'community' | 'village' | 'building';

export const DISTRICT_TYPE: { [key in DistrictType]: StatusEnum<DistrictType> } = {
  county: {
    value: 'county',
    description: '县'
  },
  town: {
    value: 'town',
    description: '乡镇',
  },
  community: {
    value: 'community',
    description: '社区',
  },
  village: {
    value: 'village',
    description: '小区',
  },
  building: {
    value: 'building',
    description: '楼（片）',
  }
};
