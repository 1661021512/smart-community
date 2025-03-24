import {StatusEnum} from './statusEnum';

/**
 * 婚姻状态
 */
export type MaritalType = 0 | 1 | 2 | 3;
export let MARITAL_TYPES: { [key: string]: StatusEnum<MaritalType> };
MARITAL_TYPES = {
  married: {
    value: 0,
    description: '已婚',
    clazz: 'primary'
  },
  unmarried: {
    value: 1,
    description: '未婚',
    clazz: 'info'
  },
  divorced: {
    value: 2,
    description: '离异',
    clazz: 'warning'
  },
  widowed: {
    value: 3,
    description: '丧偶',
    clazz: 'default'
  }
};


