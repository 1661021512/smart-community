import {StatusEnum} from './statusEnum';
/**
 * 房屋使用类型
 */
export type HouseOwnType = 0 | 1;

export const HOUSE_OWN_TYPE = {
  own: {
    value: 0 as HouseOwnType,
    description: '自有',
    clazz: 'success'
  } as StatusEnum<HouseOwnType>,
  rent: {
    value: 1 as HouseOwnType,
    description: '租赁',
    clazz: 'secondary'
  } as StatusEnum<HouseOwnType>,
};
