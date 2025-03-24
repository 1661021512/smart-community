/**
 * 角色.
 */
export class Role {
  children: Role[];
  /**
   * id
   */
  id: number;
  /**
   * 名称
   */
  name: string;
  /**
   * 是否系统内置角色
   */
  systemed: boolean;
  /**
   * 值
   * 用于前后台对接，该值具有唯一性
   */
  value: string;
  /**
   * 权重
   */
  weight: number;

  constructor(data = {} as {
    id?: number,
    name?: string,
    value?: string,
    weight?: number,
    systemed?: boolean,
    children?: Role[]
  }) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.value = data.value;
      this.weight = data.weight;
      this.systemed = data.systemed;
      if (data.children && Array.isArray(data.children)) {
        this.children = data.children.map(role => role instanceof Role ? role : new Role(role));
      }
    }
  }
}
