import {Component, forwardRef, OnInit} from '@angular/core';
import {WebUserService} from '../../../service/web-user.service';
import {DISTRICT_TYPE, DistrictType} from '../../../../projects/lib/src/entity/enum/district-type';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {House} from '../../../../projects/lib/src/entity/house';
import {Assert} from '@yunzhi/utils';

/**
 * 选择住房组件
 * @author panjie
 */
@Component({
  selector: 'app-house-choose',
  templateUrl: './house-choose.component.html',
  styleUrls: ['./house-choose.component.scss'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => HouseChooseComponent)}
  ]
})
export class HouseChooseComponent implements OnInit, ControlValueAccessor {
  /**楼房ID*/
  buildingFormControl = new FormControl();

  formControl = new FormControl();
  /**显示楼选择组件*/
  showBuildingSelect = true;
  /**显示小区选择组件*/
  showVillageSelect = true;
  /**小区ID*/
  villageControl = new FormControl();
  /**当前登录用户所在的区域类型*/
  private currentUserRegionType = DISTRICT_TYPE.building.value as DistrictType;

  constructor(private userService: WebUserService) {
  }

  /**
   * 当重新选择小区时，将选择的楼设置为null
   * 当重新选择楼时，将选择的hOUSE设置为null
   */
  synchroDataOnSelectChange() {
    this.villageControl.valueChanges.subscribe(() => {
      this.buildingFormControl.setValue(null);
    })
    this.buildingFormControl.valueChanges.subscribe(() => {
      this.formControl.setValue(null);
    })
  }

  registerOnChange(fn: (houses: House) => void): void {
    this.formControl.valueChanges.subscribe(data => fn(data));
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState?(isDisabled: boolean): void {
  }

  writeValue(houses: House): void {
    this.formControl.setValue(houses);
  }

  /**
   * 初始化时获取当前登录用户，并根据当前登录所在的区域类型来设置小区ID或楼ID
   */
  ngOnInit(): void {
    this.userService.currentLoginUser$.subscribe(user => {
      Assert.isNotNullOrUndefined(user, 'user格式不正确');
      Assert.isNotNullOrUndefined(user.district, '未传入用户区域或传入的类型不正确');
      Assert.isString(user.district.type, '区域类型并不是string');
      Assert.isNumber(user.district.id, '区域实现ID非法');
      this.currentUserRegionType = user.district.type;
      if (this.currentUserRegionType === DISTRICT_TYPE.village.value ||
        this.currentUserRegionType === DISTRICT_TYPE.building.value) {
        // 当前用户权限小于等于小区管理员，则隐藏选择小区组件
        this.showVillageSelect = false;
        this.villageControl.setValue(user.district.id);
      } else {
        this.showVillageSelect = true;
        this.villageControl.setValue(null);
      }

      if (this.currentUserRegionType === DISTRICT_TYPE.building.value) {
        // 当前用户权限为楼长及以下，则隐藏选择楼组件
        this.showBuildingSelect = false;
        this.buildingFormControl.setValue(user.district.id);
      } else {
        this.showBuildingSelect = true;
        this.buildingFormControl.setValue(null);
      }
    });

    this.synchroDataOnSelectChange();
  }
}
