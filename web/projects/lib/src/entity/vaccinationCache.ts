/**
 * 接种缓存
 */

export class VaccinationCache {
  /**
   * 接种人数
   */
  vaccinated: number;

  /**
   * 总人数
   */
  total: number;

  constructor(data = {} as
    {vaccinated?: number, total?: number}) {
    this.vaccinated = data.vaccinated;
    this.total = data.total;
  }
}
