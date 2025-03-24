import { Pipe, PipeTransform } from '@angular/core';
import { StatusEnum } from 'projects/lib/src/entity/enum/statusEnum';
import {HouseType, House_TYPE } from 'projects/lib/src/entity/enum/house-type';

@Pipe({
  name: 'villageType'
})
export class VillageTypePipe implements PipeTransform {

  transform(type: HouseType, ...args: unknown[]): unknown {
    for (let key in House_TYPE) {
      const value = House_TYPE[key] as StatusEnum<HouseType>;
      if (value.value === type) {
        return value.description;
      }
    }
    console.error(`未找到值为${type}的住房类型`);
    return '-';
  }

}
