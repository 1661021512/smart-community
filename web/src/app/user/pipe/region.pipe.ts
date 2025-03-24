import {Pipe, PipeTransform} from '@angular/core';
import {WebUserService} from "../../../service/web-user.service";
import {DistrictService} from "../../../../projects/lib/src/service/district.service";
import {Observable, of} from "rxjs";
import {Assert, isNotNullOrUndefined} from "@yunzhi/utils";
import {DISTRICT_TYPE} from "../../../../projects/lib/src/entity/enum/district-type";

/**
 * #647
 * 用户管理 所属区域 异步管道
 * @author liguowen
 */

@Pipe({
  name: 'region'
})
export class RegionPipe implements PipeTransform {

  /**对于相同的输入，输出应该相同，本实例的目的在于缓存Observable*/
  private observable = new Observable<string>(subscriber => {
    subscriber.next('-');
    subscriber.complete();
  });

  /**缓存*/
  private cacheRegionId: number;

  constructor(private userService: WebUserService,
              private districtService: DistrictService) {
  }

  transform(regionId: number): Observable<string> {
    if (!isNotNullOrUndefined(regionId)) {
      this.cacheRegionId = null;
      return of('-');
    }

    Assert.isInteger(regionId,'请传入id');

    // 有缓存时，直接输出缓存
    if (this.cacheRegionId === regionId){
      return this.observable;
    }
    this.cacheRegionId = regionId;

    this.observable = new Observable<string>(subscriber => {
      this.districtService.getDistrictsOfCurrentLoginUser(DISTRICT_TYPE.building.value)
        .subscribe(districts => {
          // userDistrictId 当前登录用户区域id
          const userDistrictId = districts[0].id;
          this.districtService.getById(userDistrictId)
            .subscribe(userDistrict => {
              this.districtService.getById(regionId)
                .subscribe(district => {
                  subscriber.next(this.districtService.getDistrictByParent(userDistrict, district, district.name));
                  subscriber.complete();
                })
            })
        });

    });

    return this.observable;
  }

}
