import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {VillageService} from '../../../../projects/lib/src/service/village.service';
import {ActivatedRoute} from '@angular/router';
import {Village} from '../../../../projects/lib/src/entity/village';
import {Assert} from '@yunzhi/utils';
import {CommonService} from '../../../../projects/lib/src/service/common.service';
import {Community} from '../../../../projects/lib/src/entity/community';
import {HouseType} from '../../../../projects/lib/src/entity/enum/house-type';
import { WebUserService } from "../../../service/web-user.service";
import { DISTRICT_TYPE } from "../../../../projects/lib/src/entity/enum/district-type";

@Component({
  selector: 'app-village-edit',
  templateUrl: './village-edit.component.html',
  styleUrls: ['./village-edit.component.scss']
})
export class VillageEditComponent implements OnInit {
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
    houseType: 'houseType',
    establishTime: 'establishTime',
    townId: 'townId',
    communityId: 'communityId'
  };

  /**
   * 是否有默认社区
   */
  isDefaultCommunity = false;

  /**
   * 是否有默认乡镇
   */
  isDefaultTown = false;

  village: Village;

  constructor(private villageService: VillageService,
              private commonService: CommonService,
              private route: ActivatedRoute,
              private userService: WebUserService) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      const id = +param.id;
      Assert.isInteger(id, 'id must be number');
      this.loadById(id);
    });
  }

  /**
   * 加载要编辑的小区数据
   * @param id id
   */
  loadById(id: number): void {
    this.villageService.getById(id)
      .subscribe((village) => {
        this.validate(village);
        this.setFormGroupData(village);
        this.village = village;
      }, error => console.log(error))
  }

  /**
   * 提交
   * @param formGroup 表单
   */
  onSubmit(formGroup: FormGroup): void {
    const newVillage = new Village({
      name: this.formGroup.get(this.formKeys.name).value as string,
      pinyin: this.formGroup.get(this.formKeys.pinyin).value as string,
      longitude: this.formGroup.get(this.formKeys.longitude).value as number,
      latitude: this.formGroup.get(this.formKeys.latitude).value as number,
      houseType: this.formGroup.get(this.formKeys.houseType).value as HouseType,
      // model: {
      //   id: this.formGroup.get(this.formKeys.modelId).value
      // } as Model,
      establishTime: this.formGroup.get(this.formKeys.establishTime).value as number,
      community: {
        id: this.formGroup.get(this.formKeys.communityId).value,
      } as Community,
    });

    this.villageService.update(this.village.id, newVillage)
      .subscribe(
        () => {
          this.commonService.success(() => this.commonService.back());
        },
        error => console.log('保存失败', error));
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

  /**
   * 设置formGroup表单数据
   * @param village
   */
  public setFormGroupData(village: Village) {
    // 添加两个表单控制器进去，分别控制V层名称及拼音两个表单
    this.formGroup = new FormGroup({});
    this.formGroup.addControl(this.formKeys.name, new FormControl(village.name, Validators.required));
    this.formGroup.addControl(this.formKeys.pinyin, new FormControl(village.pinyin, Validators.required));
    this.formGroup.addControl(this.formKeys.longitude, new FormControl(village.longitude, Validators.required));
    this.formGroup.addControl(this.formKeys.latitude, new FormControl(village.latitude, Validators.required));
    this.formGroup.addControl(this.formKeys.houseType, new FormControl(village.houseType, Validators.required));
    this.formGroup.addControl(this.formKeys.townId, new FormControl(village.community.town.id, Validators.required));
    this.formGroup.addControl(this.formKeys.establishTime, new FormControl(village.establishTime, Validators.required));
    this.formGroup.addControl(this.formKeys.communityId, new FormControl(village.community.id, Validators.required));
    // 如果乡镇的的Id变更 将社区fromControl置为请选择
    this.formGroup.get(this.formKeys.townId).valueChanges.subscribe(() => {
      this.formGroup.get(this.formKeys.communityId).setValue(null);
    })
    // 将时间戳转换为日期字符串
    this.formGroup.addControl(this.formKeys.establishTime,
      new FormControl(0, Validators.required));

    this.setDefaultDistrict();
  }

  /**
   * 对属性进行校验
   * @param village 小区
   */
  public validate(village: Village): void {
    Assert.isObject(village, village.community, village.community.town, 'some properties must be object');
    Assert.isString(village.name,
      village.pinyin,
      'some properties must be passed');
    Assert.isNumber(
      village.latitude,
      village.longitude,
      village.houseType,
      village.establishTime,
      village.community.id,
      village.community.town.id,
      'some properties must be number');
  }
}

