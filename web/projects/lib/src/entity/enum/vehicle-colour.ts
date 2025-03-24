import {StatusEnum} from './statusEnum';

/**
 * 车辆颜色
 */
export type VehicleColour = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export const VEHICLE_COLOUR = {
  white: {
    value: 0 as VehicleColour,
    description: '白色',
  } as StatusEnum<VehicleColour>,
  black: {
    value: 1 as VehicleColour,
    description: '黑色',
  } as StatusEnum<VehicleColour>,
  yellow: {
    value: 2 as VehicleColour,
    description: '黄色',
  } as StatusEnum<VehicleColour>,
  pink: {
    value: 3 as VehicleColour,
    description: '粉色',
  } as StatusEnum<VehicleColour>,
  red: {
    value: 4 as VehicleColour,
    description: '红色',
  } as StatusEnum<VehicleColour>,
  purple: {
    value: 5 as VehicleColour,
    description: '紫色',
  } as StatusEnum<VehicleColour>,
  green: {
    value: 6 as VehicleColour,
    description: '绿色',
  } as StatusEnum<VehicleColour>,
  blue: {
    value: 7 as VehicleColour,
    description: '蓝色',
  } as StatusEnum<VehicleColour>,
  brown: {
    value: 8 as VehicleColour,
    description: '棕色',
  } as StatusEnum<VehicleColour>,
  grey: {
    value: 9 as VehicleColour,
    description: '灰色',
  } as StatusEnum<VehicleColour>,
}
