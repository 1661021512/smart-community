import {StatusEnum} from './statusEnum';

/**
 * 性别
 */
export type sex = 0 | 1;

export const SEX = {
  male: {
    value: 0,
    description: '男',
    clazz: 'primary'
  } as StatusEnum<number>,
  female: {
    value: 1,
    description: '女',
    clazz: 'success'
  } as StatusEnum<number>,
}
