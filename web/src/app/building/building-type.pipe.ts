import { Pipe, PipeTransform } from '@angular/core';
import { HouseType, House_TYPE } from 'projects/lib/src/entity/enum/house-type';
import { StatusEnum } from 'projects/lib/src/entity/enum/statusEnum';

@Pipe({
  name: 'buildingType'
})
export class BuildingTypePipe implements PipeTransform {

  transform(type: HouseType, ...args: unknown[]): unknown {
    for (let key in House_TYPE) {
      const value = House_TYPE[key] as StatusEnum<HouseType>;
      if (value.value === type) {
        return value.description;
      }
    }
    console.error(`未找到值为${type}的楼栋类型`);
    return '-';
  }
}
