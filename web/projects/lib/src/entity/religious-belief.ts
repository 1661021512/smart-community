/**
 * 宗教信仰
 */
export class ReligiousBelief {
  id: number;
  name: string;

  constructor(data = {} as { id?: number, name?: string }) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
    }
  }
}
