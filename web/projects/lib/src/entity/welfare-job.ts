import {WelfareJobPostType} from './enum/welfareJob-postType'

/**
 * 公益性岗位-实体
 */
export class WelfareJob {
  /**
   * id
   */
  id: number;

  /**
   * 姓名
   */
  name: string;

  /**
   * 性别
   */
  sex: boolean;

  /**
   * 出生日期
   */
  birthday: number;

  /**
   * 电话号码
   */
  phone: string;

  /**
   * 工作单位
   */
  workPlace: string;

  /**
   * 职位
   */
  post: string;

  /**
   * 岗位类型
   */
  postType: WelfareJobPostType;

  constructor(data = {} as {
    id?: number,
    name?: string,
    sex?: boolean,
    birthday?: number,
    phone?: string,
    workPlace?: string,
    post?: string,
    postType?: WelfareJobPostType
  }){
    this.id = data.id;
    this.name = data.name;
    this.sex = data.sex;
    this.birthday = data.birthday;
    this.phone = data.phone;
    this.workPlace = data.workPlace;
    this.post = data.post;
    this.postType = data.postType;
  }
}
