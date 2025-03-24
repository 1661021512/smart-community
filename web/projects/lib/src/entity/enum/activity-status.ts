import {StatusEnum} from './statusEnum';
/**
 * 活动状态
 */
export type ActivityStatus = 0 | 1 ;

export const Activity_Status = {
  handing: {
    value: 0 as ActivityStatus,
    clazz: 'success',
    description: '进行中',
  }as StatusEnum<ActivityStatus>,
  end: {
    value: 1 as ActivityStatus,
    clazz: 'secondary',
    description: '已结束',
  } as StatusEnum<ActivityStatus>
};
