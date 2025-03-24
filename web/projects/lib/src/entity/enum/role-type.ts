import {StatusEnum} from './statusEnum';

/**
 * 内置角色
 */
export type RoleType = 'user' | 'admin' | 'party' | 'grider' | 'volunteer' | 'communityWorker';

export const ROLE_TYPE = {
  user: {
    value: 'user' as RoleType,
    description: '普通用户',
  } as StatusEnum<RoleType>,
  admin: {
    value: 'admin' as RoleType,
    description: '管理员',
  } as StatusEnum<RoleType>,
  party: {
    value: 'party' as RoleType,
    description: '党组织成员',
  } as StatusEnum<RoleType>,
  grider: {
    value: 'grider' as RoleType,
    description: '网格员',
  } as StatusEnum<RoleType>,
  volunteer: {
    value: 'volunteer' as RoleType,
    description: '志愿者',
  } as StatusEnum<RoleType>,
  communityWorker: {
    value: 'volunteer' as RoleType,
    description: '社区工作人员',
  } as StatusEnum<RoleType>,
};
