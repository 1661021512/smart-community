import {StatusEnum} from './statusEnum';

/**
 * 车位类型
 */
export type ParkingSpaceType = 0 | 1;

export const PARKING_SPACE_TYPE = {
  own: {
    value: 0 as ParkingSpaceType,
    description: '购买',
    clazz: 'success'
  } as StatusEnum<ParkingSpaceType>,
  rent: {
    value: 1 as ParkingSpaceType,
    description: '租赁',
    clazz: 'secondary'
  } as StatusEnum<ParkingSpaceType>,
};
