import {Building} from './building';
import {House} from './house';
import {Assert} from '@yunzhi/utils';

/**
 * 楼房中的单元
 * 平房中的排
 * @author panjie
 */
export class Unit {
  /**
   * 一个单元中的 层,第层中有多少个往房
   * 比如单元中有10层，每层有两个住房
   * 则_floors的大小为10，其它每一项的大小为2
   */
  _floors = new Array<Array<House>>();

  _houseCountPerFloor: number;
  _maxFloor: number;

  /**
   * 住宅楼
   */
  building: Building;

  /**
   * 住户
   */
  houses = new Array<House>();

  id: number;

  /**
   * 名称
   */
  name: string;

  /**
   * 用于排序的权重
   * 权重越小越靠前
   */
  weight: number;

  constructor(data: {
    id?: number,
    building?: Building,
    _maxFloor?: number,
    name?: string,
    houses?: House[],
    _houseCountPerFloor?: number,
    weight?: number
  }) {
    this.id = data.id;
    this.name = data.name;
    this.weight = data.weight;
    this._maxFloor = data._maxFloor;
    this._houseCountPerFloor = data._houseCountPerFloor;
    this.building = data.building instanceof Building ? data.building : new Building(data.building);
    if (Array.isArray(data.houses)) {
      this.houses = data.houses;
    }
  }

  /**
   * house按照floor分组
   */
  public static getFloors(houses: House[]): Array<Array<House>> {
    houses.forEach(house => {
      Assert.isNotNullOrUndefined(house.weight, 'house.weight must be set');
      Assert.isNotNullOrUndefined(house.floor, 'house.floor must be set');
    })
    houses.sort((a, b) => a.weight - b.weight);
    const record = {} as Record<number, House[]>;
    houses.forEach(value => {
      const floor = value.floor;
      if (!Array.isArray(record[floor])) {
        record[floor] = [];
      }
      record[floor].push(value);
    })

    const result = [];
    for (let resultKey in record) {
      result.push(record[resultKey]);
    }

    return result.reverse();
  }
}
