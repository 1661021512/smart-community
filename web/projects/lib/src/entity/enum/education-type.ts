import {StatusEnum} from './statusEnum';

/**
 * 受教育程度类型
 */

export type EducationType = 0 | 1 | 2 | 3;
export const EDUCATION_TYPE: {[key: string]: StatusEnum<EducationType>} = {
  juniorHighSchoolAndBelow: {
    value: 0 as EducationType,
    clazz: 'secondary',
    description: '初中及以下',
  } as StatusEnum<EducationType>,
  highSchool: {
    value: 1 as EducationType,
    clazz: 'info',
    description: '高中',
  } as StatusEnum<EducationType>,
  college: {
    value: 2 as EducationType,
    clazz: 'primary',
    description: '大学专科',
  } as StatusEnum<EducationType>,
  bachelorDegreeAndAbove: {
    value: 3 as EducationType,
    clazz: 'success',
    description: '大学本科及以上',
  } as StatusEnum<EducationType>,
};
