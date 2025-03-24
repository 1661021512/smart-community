import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {VillageService} from '../../../../projects/lib/src/service/village.service';
import {Village} from '../../../../projects/lib/src/entity/village';
import {Assert} from '@yunzhi/utils';
import {Building} from 'projects/lib/src/entity/building';
import {House_TYPE, HouseType} from 'projects/lib/src/entity/enum/house-type';
import {BuildingService} from 'projects/lib/src/service/building.service';
import {CommonService} from 'projects/lib/src/service/common.service';
import {District} from '../../../../projects/lib/src/entity/district';
import {DISTRICT_TYPE} from '../../../../projects/lib/src/entity/enum/district-type';

/**
 * 住宅楼新增
 */

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  building: Building;
  console = console;
  /**
   * 初始化表单组
   */
  formGroup = new FormGroup({});
  /**
   * 表单关键字
   */
  formKeys = {
    villageId: 'villageId',
    name: 'name',
    horizontalOffset: 'horizontalOffset',
    verticalOffset: 'verticalOffset',
    houseType: 'houseType',
    unitCount: 'unitCount',
    maxFloor: 'maxFloor',
    housesLengthOfFloor: 'housesLengthOfFloor'
  };
  village: Village;
  /**显示楼选择组件*/
  constructor(private buildingService: BuildingService,
              private villageService: VillageService,
              private commonService: CommonService) {
  }

  filterDistrict(district: District): boolean {
    Assert.isNotNullOrUndefined(district, 'district 为空');
    Assert.isString(district.type, 'district.type必须是字符串');
    return district.type === DISTRICT_TYPE.village.value;
  }


  ngOnInit(): void {
    this.formGroup.addControl(this.formKeys.villageId, new FormControl(null,
      [Validators.required]));
    this.formGroup.addControl(this.formKeys.name, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.horizontalOffset, new FormControl(null, Validators.required));
    this.formGroup.addControl(this.formKeys.verticalOffset, new FormControl(null, Validators.required));
    this.formGroup.addControl(this.formKeys.houseType, new FormControl(House_TYPE.building.value, Validators.required));
    this.formGroup.addControl(this.formKeys.unitCount, new FormControl(null,
      [Validators.required, Validators.min(1)]));
    this.formGroup.addControl(this.formKeys.maxFloor, new FormControl(null,
      [Validators.required, Validators.min(1)]));
    this.formGroup.addControl(this.formKeys.villageId, new FormControl(null, Validators.required))
    this.formGroup.addControl(this.formKeys.housesLengthOfFloor, new FormControl(null,
      [Validators.required, Validators.min(1)]))
    this.changes();
  }

  /**
   * 提交
   * @param formGroup 表单
   */
  onSubmit(formGroup: FormGroup): void {
    const newBuilding = {
      village: {
        id: formGroup.get(this.formKeys.villageId).value as number,
      } as Village,
      name: formGroup.get(this.formKeys.name).value as string,
      horizontalOffset: formGroup.get(this.formKeys.horizontalOffset).value as number,
      verticalOffset: formGroup.get(this.formKeys.verticalOffset).value as number,
      houseType: formGroup.get(this.formKeys.houseType).value as HouseType,
      unitCount: formGroup.get(this.formKeys.unitCount).value as number,
      maxFloor: formGroup.get(this.formKeys.maxFloor).value as number,
      housesLengthOfFloor: formGroup.get(this.formKeys.housesLengthOfFloor).value as number,
    } as Building;
    this.buildingService.save(newBuilding)
      .subscribe(
        () => {
          this.commonService.success(() => this.commonService.back());
        },
        error => console.log('保存失败', error));
  }

  /**
   * 对属性进行校验
   * @param village 小区
   */
  public validate(village: Village): void {
    Assert.isObject(village, 'village must be object');
    Assert.isString(village.name,
      'some properties must be passed');
  }
  public changes(): void {
    this.formGroup.get(this.formKeys.houseType).valueChanges.subscribe(() => {
      if(this.formGroup.get(this.formKeys.houseType).value === House_TYPE.building.value) {
        this.formGroup.get(this.formKeys.housesLengthOfFloor).setValue(null);
      } else if(this.formGroup.get(this.formKeys.houseType).value === House_TYPE.bungalow.value) {
        this.formGroup.get(this.formKeys.housesLengthOfFloor).setValue(1);
      }
    })
  }
}
