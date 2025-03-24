import {Pipe, PipeTransform} from '@angular/core';
import {House} from '../../../../projects/lib/src/entity/house';
import {WebUserService} from '../../../service/web-user.service';
import {DISTRICT_TYPE} from '../../../../projects/lib/src/entity/enum/district-type';
import {Assert, isNotNullOrUndefined} from '@yunzhi/utils';
import {Observable, of} from 'rxjs';
import {DistrictService} from '../../../../projects/lib/src/service/district.service';
import {HouseService} from '../../../../projects/lib/src/service/house.service';

/**
 * 居民管理 -》住址管道
 * #523
 * @author limingao
 */

@Pipe({
  name: 'housePlace'
})
export class HousePlacePipe implements PipeTransform {
  /**对于相同的输入，输出应该相同，本实例的目的在于缓存Observable*/
  private observable = new Observable<string>(subscriber => {
    subscriber.next('-');
    subscriber.complete();
  });
  /**缓存*/
  private cacheHouseId: number;

  constructor(private userService: WebUserService,
              private districtService: DistrictService) {
  }


  transform(house: House): Observable<string> {
    // 支持用户传入undefined \ null \ {} \ {id: undefined} \ {id: null} 的初始值
    if (!isNotNullOrUndefined(house) || !isNotNullOrUndefined(house.id)) {
      this.cacheHouseId = null;
      return of('-');
    }

    Assert.isDefined(house.unit, house.id, self.name + '必须传入住户的单元、ID 信息');
    Assert.isDefined(house.unit.building, self.name + ' 必须传入单元的楼栋信息');

    // 有缓存时，直接输出缓存
    if (house.id === this.cacheHouseId) {
      return this.observable;
    }
    this.cacheHouseId = house.id;

    // 返回观察者
    this.observable = new Observable<string>(subscriber => {
      this.districtService.getDistrictsOfCurrentLoginUser(DISTRICT_TYPE.building.value)
        .subscribe(districts => {
          // 获取当前用户拥有的所有的buildingId
          const buildingIds = districts.filter(district => district.type === DISTRICT_TYPE.building.value)
            .map(district => district.id);

          const building = house.unit.building;
          Assert.isInteger(building.id, self.name + '  building.is must be int');

          // 如果当前房子的楼柜栋 ID 并不位于数组中，则说明说明房子的区域与当前登录用户区域并不属于同一个区域，则显示全称
          // 如果当前房子的楼栋 ID 位于数组中，则说明该用户所在区域包括房子所有的区域，则显示简称
          if (buildingIds.indexOf(building.id) === -1) {
            subscriber.next(HouseService.getFullNameWithType(house, DISTRICT_TYPE.county.value));
            subscriber.complete();
          } else {
            this.userService.currentLoginUser$.subscribe(user => {
              if (user) {
                subscriber.next(HouseService.getFullNameWithType(house, user.district.type));
                subscriber.complete();
              }
            });
          }
        });
    });


    return this.observable;
  }
}
