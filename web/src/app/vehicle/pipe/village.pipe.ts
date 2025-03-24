import {Pipe, PipeTransform} from '@angular/core';
import {House} from '../../../../projects/lib/src/entity/house';
import {DISTRICT_TYPE} from '../../../../projects/lib/src/entity/enum/district-type';
import {Observable} from 'rxjs';
import {WebUserService} from '../../../service/web-user.service';
import {Assert} from '@yunzhi/utils';

/**
 * 根据houses获取小区异步管道
 * 当前是根据车辆实体中的resident的houses获取小区，
 * 但是一个resident可能有多个house，此管道进行筛选，
 * 只显示当前管理人员社区中的小区
 */
@Pipe({
  name: 'village'
})
export class VillagePipe implements PipeTransform {

  result = "" as string;

  constructor(private userService: WebUserService,
  ) {
  }

  transform(houses: House[]): Observable<string> {
    Assert.isArray(houses,'houses不是数组');
    const observable = new Observable<string>(subscriber => {
      // 获取当前登录用户
      this.userService.currentLoginUser$
        .subscribe(user => {
          if (user.district.type !== DISTRICT_TYPE.community.value) {
            houses.forEach(house => {
              this.result = this.result + house.unit.building.village.name + ' ';
            });
            subscriber.next(this.result);
            subscriber.complete();
          }
          // 对houses 进行筛选
          houses = houses.filter(house => house.unit.building.village.community.id === user.district.id);
          // 同一社区可能有多所住房
          if (houses.length === 0) {
            this.result = '-';
          } else if (houses.length === 1) {
            this.result = houses[0].unit.building.village.name;
          } else {
            houses.forEach(house => {
              this.result = this.result + house.unit.building.village.name + ' ';
            });
          }
          // 发送数据
          subscriber.next(this.result);
          subscriber.complete();
        });
    });
    return observable;
  }

}
