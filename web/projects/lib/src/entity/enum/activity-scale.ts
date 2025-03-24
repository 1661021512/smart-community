import {StatusEnum} from './statusEnum';
/**
 * 活动规模
 */
export type ActivityScale = 0 | 1 | 2;

export const Activity_Scale = {
  small: {
    value: 0 as ActivityScale,
    clazz: 'info',
    description: '小'
  }as StatusEnum<ActivityScale>,
  middle: {
    value: 1 as ActivityScale,
    clazz: 'primary',
    description: '中',
  }as StatusEnum<ActivityScale>,
  large: {
    value: 2 as ActivityScale,
    clazz: 'success',
    description: '大',
  } as StatusEnum<ActivityScale>
};
