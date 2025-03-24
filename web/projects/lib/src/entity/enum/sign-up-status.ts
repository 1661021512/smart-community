import {StatusEnum} from './statusEnum';

/**
 * 报名状态
 */
export type SignUpStatus = 0 | 1 | 2;

export const SIGN_UP_STATUS = {
  new: {
    value: 0 as SignUpStatus,
    description: '审核中',
  } as StatusEnum<SignUpStatus>,
  accept: {
    value: 1 as SignUpStatus,
    description: '已通过',
  } as StatusEnum<SignUpStatus>,
  refuse: {
    value: 2 as SignUpStatus,
    description: '已拒绝',
  } as StatusEnum<SignUpStatus>,
}
