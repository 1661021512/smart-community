import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {VillageService} from '../../../../projects/lib/src/service/village.service';
import {CommonService} from '../../../../projects/lib/src/service/common.service';
import {Village} from '../../../../projects/lib/src/entity/village';
import {Community} from '../../../../projects/lib/src/entity/community';
import {House_TYPE, HouseType} from '../../../../projects/lib/src/entity/enum/house-type';
import {YzAsyncValidators} from '../../../../projects/lib/src/validator/yz-async-validators';
import {WebUserService} from '../../../service/web-user.service';
import { DISTRICT_TYPE } from "../../../../projects/lib/src/entity/enum/district-type";
import { District } from "../../../../projects/lib/src/entity/district";

/**
 * 小区添加
 */
@Component({
  selector: 'app-village-add',
  templateUrl: './village-add.component.html',
  styleUrls: ['./village-add.component.scss']
})
export class VillageAddComponent implements OnInit {
  /**
   * 默认社区
   */
  defaultCommunity = null;

  /**
   * 默认乡镇
   */
  defaultTown = null;

  /**
   * 初始化表单组
   */
  formGroup = new FormGroup({});
  /**
   * 表单关键字
   */
  formKeys = {
    name: 'name',
    pinyin: 'pinyin',
    longitude: 'longitude',
    latitude: 'latitude',
    establishTime: 'establishTime',
    townId: 'townId',
    communityId: 'communityId',
    secondaryGeoJson: 'secondaryGeoJson'
  };
  /**
   * 房屋类型默认为楼房
   */
  @Input()
  houseType = House_TYPE.building.value as HouseType;

  /**
   * 是否有默认社区
   */
  isDefaultCommunity = false;

  /**
   * 是否有默认乡镇
   */
  isDefaultTown = false;

  constructor(private villageService: VillageService,
              private commonService: CommonService,
              private yzAsyncValidators: YzAsyncValidators,
              private userService: WebUserService) {
  }

  ngOnInit(): void {
    this.formGroup.addControl(this.formKeys.name, new FormControl('', Validators.required, this.yzAsyncValidators.villageNameNotExist()));
    this.formGroup.addControl(this.formKeys.pinyin, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.longitude, new FormControl(null, Validators.required));
    this.formGroup.addControl(this.formKeys.latitude, new FormControl(null, Validators.required));
    this.formGroup.addControl(this.formKeys.establishTime, new FormControl(null, Validators.required));
    this.formGroup.addControl(this.formKeys.townId, new FormControl(null, Validators.required));
    this.formGroup.addControl(this.formKeys.communityId, new FormControl(null, Validators.required));
    // 如果乡镇的的Id变更 将社区fromControl置为请选择
    this.formGroup.get(this.formKeys.townId).valueChanges.subscribe(() => {
      this.formGroup.get(this.formKeys.communityId).setValue(null);
    })
    this.setDefaultDistrict();
  }

  /**
   * 根据用户区域设置默认值
   */
  setDefaultDistrict(): void {
    // 获取当前登录用户区域并固定乡镇或社区
    const district = this.userService.getCurrentUser().district;
    // 如果是乡镇，则默认乡镇值
    if (district.type === DISTRICT_TYPE.town.value) {
      this.isDefaultTown = true;
      this.defaultTown = district.name;
      this.formGroup.get(this.formKeys.townId).setValue(district.id);
      // 如果是社区，则默认乡镇值和社区值
    } else if (district.type === DISTRICT_TYPE.community.value) {
      this.isDefaultTown = true;
      this.defaultTown = district.parent.name;
      this.formGroup.get(this.formKeys.townId).setValue(district.parent.id);
      this.isDefaultCommunity = true;
      this.defaultCommunity = district.name;
      this.formGroup.get(this.formKeys.communityId).setValue(district.id);
    }
  }

  onSubmit(formGroup: FormGroup): void {
    const newVillage = new Village({
      name: formGroup.get(this.formKeys.name).value as string,
      pinyin: formGroup.get(this.formKeys.pinyin).value as string,
      longitude: formGroup.get(this.formKeys.longitude).value as number,
      latitude: formGroup.get(this.formKeys.latitude).value as number,
      houseType: this.houseType,
      establishTime: formGroup.get(this.formKeys.establishTime).value as number,
      community: {
        id: formGroup.get(this.formKeys.communityId).value
      } as Community
    })

    this.villageService.save(newVillage)
      .subscribe(
        () => {
          this.commonService.success(() => this.commonService.back());
        },
        error => console.log('保存失败', error));
  }
}
