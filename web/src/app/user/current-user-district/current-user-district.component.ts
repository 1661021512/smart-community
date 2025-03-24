import {Component, Input, OnInit} from '@angular/core';
import {WebUserService} from '../../../service/web-user.service';
import {District} from '../../../../projects/lib/src/entity/district';
import {DISTRICT_TYPE} from '../../../../projects/lib/src/entity/enum/district-type';

/**
 * 显示当前登录用户所在的区域。
 * 举例：当前登录用户区域为：xx镇 -- xx社区 -- xx小区
 * <app-current-user-district></app-current-user-district>
 * 显示为：xx镇 -- xx社区 -- xx小区
 * <app-current-user-district [sample]="true"></app-current-user-district>
 *  #843
 *  @author liguowen
 */

@Component({
  selector: 'app-current-user-district',
  templateUrl: './current-user-district.component.html',
  styleUrls: ['./current-user-district.component.scss']
})
export class CurrentUserDistrictComponent implements OnInit {

  /**
   * 区域
   */
  district: string;

  @Input()
  sample = false;

  constructor(private userService: WebUserService,
  ) {
  }

  ngOnInit(): void {
    this.userService.currentLoginUser$
      .subscribe(user => {
        // 判断sample true直接返回当前区域name， false遍历parent
        if (this.sample === false) {
          this.district = this.getStringDistrict(user.district, user.district.name);
        } else {
          this.district = user.district.name;
        }
      })
  }

  /**
   * 遍历parent获取区域字符串
   * @param sonDistrict 子区域
   * @param district 区域字符串
   */
  getStringDistrict(sonDistrict: District, district): string {
    // 如果是县直接返回name
    if (sonDistrict.type === DISTRICT_TYPE.county.value) {
      return district;
    }
    if (sonDistrict.parent === null) {
      // 没有parent直接返回当前的district
      console.warn('district.parent undefined');
      return district;
    } else {
      // 如果有进一步遍历直到县
      if (sonDistrict.type !== DISTRICT_TYPE.county.value) {
        district = (sonDistrict.parent.name + '--' + district) as string;
        district = this.getStringDistrict(sonDistrict.parent, district);
      }
      return district;
    }
  }
}
