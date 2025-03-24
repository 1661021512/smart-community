import {StatusEnum} from './statusEnum';
/**
 * 政治面貌类型
 */
export type politicalType = 0 | 1;

export const POLITICAL_TYPE :{[index: string]: StatusEnum<politicalType>}= {
  masses: {
    value: 0 as politicalType,
    description: '群众',
    clazz: 'info'
  } as StatusEnum<politicalType>,
  partyMember: {
    value: 1 as politicalType,
    description: '党员',
    clazz: 'primary'
  } as StatusEnum<politicalType>,

};
