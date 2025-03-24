import {Component, Input, OnInit} from '@angular/core';
import {House} from '../../../../projects/lib/src/entity/house';
import {ActivatedRoute} from '@angular/router';
import {Assert} from '@yunzhi/utils';
import {HouseService} from '../../../../projects/lib/src/service/house.service';
import {UnitService} from '../../../../projects/lib/src/service/unit.service';
import {CommonService} from '../../../../projects/lib/src/service/common.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HouseOwnType} from '../../../../projects/lib/src/entity/enum/house-own-type';

/**
 * 编辑住房信息
 */
@Component({
  selector: 'app-house-edit',
  templateUrl: './house-edit.component.html',
  styleUrls: ['./house-edit.component.scss']
})
export class HouseEditComponent implements OnInit {
  formGroup = new FormGroup({});
  formKeys = {
    floor: 'floor',
    name: 'name',
    weight: 'weight',
    type: 'type',
    area: 'area',
    lowIncoming: 'lowIncoming',
    relief: 'relief',
    checkInTime: 'checkInTime',
    remarks: 'remarks',
  }
  @Input()
  house: House;

  protected name = 'EditComponent: ';

  constructor(private unitService: UnitService,
              private route: ActivatedRoute,
              private houseService: HouseService,
              private commonService: CommonService) {
  }

  validate(house: House) {
    Assert.isObject(house, this.name + 'house must be object');
    Assert.isDefined(
      house.unit,
      house.floor,
      house.name,
      house.weight,
      house.type,
      house.area,
      house.lowIncoming,
      house.relief,
      house.checkInTime,
      house.remarks,
      this.name + 'house validate fail');
    Assert.isDefined(house.unit.name, house.unit.building, this.name + 'house.unit validate fail');
    Assert.isDefined(house.unit.building.name, house.unit.building.village, this.name + 'house.unit.building validate fail');
    Assert.isDefined(house.unit.building.village.name, this.name + 'house.unit.building.village validate fail');
    this.formGroup.get(this.formKeys.floor).setValue(house.floor);
    this.formGroup.get(this.formKeys.name).setValue(house.name);
    this.formGroup.get(this.formKeys.weight).setValue(house.weight);
    this.formGroup.get(this.formKeys.type).setValue(house.type);
    this.formGroup.get(this.formKeys.area).setValue(house.area);
    this.formGroup.get(this.formKeys.lowIncoming).setValue(house.lowIncoming);
    this.formGroup.get(this.formKeys.relief).setValue(house.relief);
    this.formGroup.get(this.formKeys.checkInTime).setValue(house.checkInTime);
    this.formGroup.get(this.formKeys.remarks).setValue(house.remarks);
    this.formGroup.get(this.formKeys.floor).clearValidators();
  };

  ngOnInit(): void {
    this.formGroup.addControl(this.formKeys.floor, new FormControl());
    this.formGroup.addControl(this.formKeys.name, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.weight, new FormControl(10, Validators.required));
    this.formGroup.addControl(this.formKeys.type, new FormControl(null, Validators.required));
    this.formGroup.addControl(this.formKeys.area, new FormControl(0));
    this.formGroup.addControl(this.formKeys.lowIncoming, new FormControl(false));
    this.formGroup.addControl(this.formKeys.relief, new FormControl(false));
    this.formGroup.addControl(this.formKeys.checkInTime, new FormControl());
    this.formGroup.addControl(this.formKeys.remarks, new FormControl());
    this.validate(this.house);
  }

  onSubmit(formGroup: FormGroup) {
    const house = {
      floor: formGroup.get(this.formKeys.floor).value as number,
      name: formGroup.get(this.formKeys.name).value as string,
      type: formGroup.get(this.formKeys.type).value as HouseOwnType,
      area: formGroup.get(this.formKeys.area).value as number,
      lowIncoming: formGroup.get(this.formKeys.lowIncoming).value as boolean,
      relief: formGroup.get(this.formKeys.relief).value as boolean,
      checkInTime: formGroup.get(this.formKeys.checkInTime).value as number,
      remarks: formGroup.get(this.formKeys.remarks).value as string,
      weight: formGroup.get(this.formKeys.weight).value as number
    } as House;
    this.houseService.update(this.house.id, house)
      .subscribe(() => this.commonService.success(() => this.commonService.back('../../', this.route)));
  }
}

