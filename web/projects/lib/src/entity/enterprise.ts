/**
 * 企事业单位
 */
export class Enterprise {
  id: number;
  /**名字（唯一）*/
  name: string;

  constructor(data = {} as { id: number, name: string }) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
    }
  }
}
