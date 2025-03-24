import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {DistrictService} from '../../../../projects/lib/src/service/district.service';
import {Select2} from '../../share/select2/select2';
import {DISTRICT_TYPE, DistrictType} from '../../../../projects/lib/src/entity/enum/district-type';
import {District} from '../../../../projects/lib/src/entity/district';
import {HouseType} from '../../../../projects/lib/src/entity/enum/house-type';

/**
 * 选择区域（根据当前登录用户自动生成列表）
 * 1. 如果当前用户的区域范围为小区及以及，则显示区域的范围为县到小区
 * 2. 如果当前用户的区域范围为小区以下，则直接显示楼栋
 * #398
 */
@Component({
  selector: 'app-region-select-of-current-user',
  templateUrl: './region-select-of-current-user.component.html',
  styleUrls: ['./region-select-of-current-user.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => {
        return RegionSelectOfCurrentUserComponent;
      })
    }]
})
export class RegionSelectOfCurrentUserComponent implements OnInit, ControlValueAccessor {
  /**
   * 当前用户可以管理的所有的区域列表
   */
  districts = [] as Select2<number, District>[];
  @Input()
  endDistrictType = DISTRICT_TYPE.village.value as DistrictType;
  /**表单控制器*/
  formControl = new FormControl(null);
  /**
   * 房屋类型
   */
  @Input()
  houseType: HouseType;

  constructor(private districtService: DistrictService) {
  }

  /**
   * 自定义过滤器
   * @param district 区域
   */
  @Input()
  filter = (district: District) => true;

  ngOnInit(): void {
    this.districtService.getDistrictsOfCurrentLoginUser(this.endDistrictType)
      .subscribe(districts => {
        this.districts = districts
          .filter(district => this.filter(district))
          .map(district => new Select2<number, District>({
            id: district.id, option: district.name, label: district.name
          }));
      });
  }

  /**
   * 注册变更回调函数
   * @param fn 回调函数
   */
  registerOnChange(fn: (data: number) => void): void {
    this.formControl.valueChanges.subscribe(data => {
      fn(data);
    });
  }

  registerOnTouched(fn: any): void {
  }

  /**
   * 写入区域信息
   * @param value 区域
   */
  writeValue(value: number | string): void {
    let districtId = value;
    if (typeof districtId === 'string') {
      districtId = +value;
    }
    if (!Number.isInteger(districtId)) {
      districtId = null;
    }
    this.formControl.setValue(districtId);
  }
}
