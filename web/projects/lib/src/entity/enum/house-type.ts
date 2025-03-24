import {StatusEnum} from './statusEnum';
/**
 * 住房类型
 */
export type HouseType = 0 | 1;

export const House_TYPE = {
  bungalow: {
    value: 0 as HouseType,
    description: '平房',
    clazz: 'primary'
  } as StatusEnum<HouseType>,
  building: {
    value: 1 as HouseType,
    description: '楼房',
    clazz: 'info'
  } as StatusEnum<HouseType>,
};
