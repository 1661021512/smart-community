import {StatusEnum} from '../entity/enum/statusEnum';

/**
 * 内容关键字，用于区分人力资源、劳务派遣等文章
 */
export type ContentKeyword = 'humanResourcesCompany' | 'laborDispatch' | 'skillTraining' | 'headhuntingService'
  | 'jobAgent' | 'governmentAndEnterprise' | 'enterprise' | 'volunteerAssociation';

export const CONTENT_KEYWORD = {
  humanResourcesCompany: {
    value: 'humanResourcesCompany',
    description: '人力资源公司'
  } as StatusEnum<ContentKeyword>,
  laborDispatch: {
    value: 'laborDispatch',
    description: '劳务派遣'
  } as StatusEnum<ContentKeyword>,
  skillTraining: {
    value: 'skillTraining',
    description: '技能培训'
  } as StatusEnum<ContentKeyword>,
  headhuntingService: {
    value: 'headhuntingService',
    description: '猎头服务'
  } as StatusEnum<ContentKeyword>,
  jobAgent: {
    value: 'jobAgent',
    description: '代理招聘'
  } as StatusEnum<ContentKeyword>,
  governmentAndEnterprise: {
    value: 'governmentAndEnterprise',
    description: '政企对接'
  } as StatusEnum<ContentKeyword>,
  enterprise: {
    value: 'enterprise',
    description: '企业对接'
  } as StatusEnum<ContentKeyword>,
  volunteerAssociation: {
    value: 'volunteerAssociation',
    description: '志愿者协会'
  } as StatusEnum<ContentKeyword>
}
