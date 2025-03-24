/**
 * 权限
 * @Author panjie
 */
export class Access {
  /**类型为string的ID*/
  id: string;
  /**名称*/
  name: string;
  /**具体的描述信息*/
  description: string;

  constructor(data = {} as {
    id: string,
    name: string,
    description: string
  }) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
  }
}
