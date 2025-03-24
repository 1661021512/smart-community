import {StatusEnum} from './statusEnum';
/**
 * 住房类型
 */
export type WelfareJobPostType = 0 | 1 | 2 | 3;

export const WelfareJob_PostType = {
  otherPost: {
    value: 0 as WelfareJobPostType,
    description: '其他岗位',
    clazz: 'secondary'
  } as StatusEnum<WelfareJobPostType>,
  publicAdminPost: {
    value: 1 as WelfareJobPostType,
    description: '社区公共管理类岗位',
    clazz: 'primary'
  } as StatusEnum<WelfareJobPostType>,
  cityWelfarePost: {
    value: 2 as WelfareJobPostType,
    description: '城市社区公益性岗位',
    clazz: 'success'
  } as StatusEnum<WelfareJobPostType>,
  publicServicePost: {
    value: 3 as WelfareJobPostType,
    description: '机关事业单位工勤保证和公共服务岗位',
    clazz: 'info'
  } as StatusEnum<WelfareJobPostType>
};
