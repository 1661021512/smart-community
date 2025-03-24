import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {House} from '../../../../../projects/lib/src/entity/house';
import {HouseService} from '../../../../../projects/lib/src/service/house.service';
import {Assert} from '@yunzhi/utils';
import {CommonService} from '../../../../../projects/lib/src/service/common.service';
import {ResidentService} from '../../../../../projects/lib/src/service/resident.service';

/**
 * 第一步，选择住房
 * @author panjie
 */
@Component({
  templateUrl: './choose-house.component.html',
  styleUrls: ['./choose-house.component.scss']
})
export class ChooseHouseComponent implements OnInit {
  formGroup = new FormGroup({});
  formKeys = {
    villageId: 'villageId',
    houseId: 'houseId',
    buildingId: 'buildingId',
    house: {
      value: 'house',
      type: 'type',
      area: 'area',
      lowIncoming: 'lowIncoming',
      relief: 'relief',
      checkInTime: 'checkInTime',
      remarks: 'remarks'
    }
  };
  house = {} as House;
  houseGroup = new FormGroup({});

  constructor(private houseService: HouseService,
              private residentService: ResidentService,
              private commonService: CommonService) {
  }

  /**
   * 初始化表单信息
   */
  initFormGroup() {
    this.formGroup.addControl(this.formKeys.villageId, new FormControl());
    this.formGroup.addControl(this.formKeys.buildingId, new FormControl());
    this.formGroup.addControl(this.formKeys.houseId, new FormControl(null, Validators.required));
    this.formGroup.addControl(this.formKeys.house.value, this.houseGroup);

    // 子表单
    this.houseGroup.addControl(this.formKeys.house.type, new FormControl(null, Validators.required));
    this.houseGroup.addControl(this.formKeys.house.area, new FormControl(null, Validators.required));
    this.houseGroup.addControl(this.formKeys.house.lowIncoming, new FormControl(null, Validators.required));
    this.houseGroup.addControl(this.formKeys.house.relief, new FormControl(null, Validators.required));
    this.houseGroup.addControl(this.formKeys.house.checkInTime, new FormControl());
    this.houseGroup.addControl(this.formKeys.house.remarks, new FormControl());
  }

  ngOnInit(): void {
    this.initFormGroup();
    // 小区变化将 楼栋置为请选择
    this.formGroup.get(this.formKeys.villageId).valueChanges.subscribe(() => {
      this.formGroup.get(this.formKeys.buildingId).setValue(null);
    })
    // 楼栋变化将门牌号置为null
    this.formGroup.get(this.formKeys.buildingId).valueChanges.subscribe(() => {
      this.formGroup.get(this.formKeys.houseId).setValue(null);
    })
    // 门牌号变化时请求后台数据
    this.formGroup.get(this.formKeys.houseId).valueChanges.subscribe(houseId => {
      if (Number.isInteger(houseId)) {
        this.houseService.getById(houseId).subscribe(value => {
          this.setHouse(value);
        })
      } else {
        this.house = {} as House;
      }
    });
  }

  /**
   * 由居民数组中删除指定ID的居民
   */
  onRemove(residentId: number, index: number) {
    this.residentService.removeHouse(residentId, this.house.id)
      .subscribe({
        complete: () => {
          this.commonService.success(() => this.house.residents.splice(index, 1))
        }
      })
  }

  /**
   * 点击更新房屋信息时提交
   * @param formGroup 表单
   */
  onSubmit(formGroup: FormGroup) {
    const id = this.house.id;
    Assert.isNumber(id, '未选中门牌号');
    const houseFormGroup = formGroup.get(this.formKeys.house.value);
    const house = {
      type: houseFormGroup.get(this.formKeys.house.type).value,
      area: houseFormGroup.get(this.formKeys.house.area).value,
      lowIncoming: houseFormGroup.get(this.formKeys.house.lowIncoming).value,
      relief: houseFormGroup.get(this.formKeys.house.relief).value,
      checkInTime: houseFormGroup.get(this.formKeys.house.checkInTime).value,
      remarks: houseFormGroup.get(this.formKeys.house.remarks).value
    }
    Assert.isNotNullOrUndefined(house.area, '房屋面积不能为空');
    Assert.isTrue(house.area >= 0, '房屋面积需大于0');
    this.houseService.update(id, {...this.house, ...house}).subscribe({
        next: () => this.commonService.success()
      }
    );
  }

  /**
   * 设置验证房子
   * @param house 房子
   */
  setHouse(house: House) {
    this.validate(house);
    this.houseGroup.get(this.formKeys.house.type).setValue(house.type);
    this.houseGroup.get(this.formKeys.house.area).setValue(house.area);
    this.houseGroup.get(this.formKeys.house.lowIncoming).setValue(house.lowIncoming);
    this.houseGroup.get(this.formKeys.house.relief).setValue(house.relief);
    this.houseGroup.get(this.formKeys.house.checkInTime).setValue(house.checkInTime);
    this.houseGroup.get(this.formKeys.house.remarks).setValue(house.remarks);
    this.house = house;
  }

  /**
   * 校验
   * @param house 房子
   */
  validate(house: House) {
    Assert.isNotNullOrUndefined(house, '房屋不能为空');
    Assert.isDefined(house.type, house.area, house.lowIncoming, house.relief, house.checkInTime, house.remarks,
      house.owner, '房屋实体属性校验失败');
    Assert.isArray(house.residents, '未接收到房屋到应的居民信息');
    house.residents.forEach(value => {
      Assert.isDefined(value.id, value.name, value.sex, value.encodedIdNumber, value.encodedPhone, value.nationality,
        value.religiousBelief, value.education, value.politicalClimate, value.workPlace, '部分居民信息未定义');
    });
  }
}
