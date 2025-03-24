import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {House_TYPE} from 'projects/lib/src/entity/enum/house-type';
import {BuildingService} from '../../../../projects/lib/src/service/building.service';
import {Building} from '../../../../projects/lib/src/entity/building';
import {Village} from '../../../../projects/lib/src/entity/village';
import {CommonService} from '../../../../projects/lib/src/service/common.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  /**
   * 初始化表单组
   */
  formGroup = new FormGroup({});

  /**
   * 表单关键字
   * 片区为houseType
   */
  formKeys = {
    villageId: 'villageId',
    name: 'name',
    horizontalOffset: 'horizontalOffset',
    verticalOffset: 'verticalOffset',
    unitCount: 'unitCount'
  };

  constructor(private buildingService: BuildingService,
              private commonService: CommonService) {
  }

  houseType = House_TYPE.bungalow.value;

  ngOnInit(): void {
    this.formGroup.addControl(this.formKeys.villageId, new FormControl(null, [Validators.required]));
    this.formGroup.addControl(this.formKeys.name, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.horizontalOffset, new FormControl(null, Validators.required));
    this.formGroup.addControl(this.formKeys.verticalOffset, new FormControl(null, Validators.required));
    this.formGroup.addControl(this.formKeys.unitCount, new FormControl(null, Validators.required));
  }

  onSubmit(formGroup: FormGroup) {
    const building = {
      name: formGroup.get(this.formKeys.name).value as string,
      village: {id: formGroup.get(this.formKeys.villageId).value as number} as Village,
      horizontalOffset: formGroup.get(this.formKeys.horizontalOffset).value as number,
      verticalOffset: formGroup.get(this.formKeys.verticalOffset).value as number,
      unitCount: formGroup.get(this.formKeys.unitCount).value as number,
      housesLengthOfFloor: 1,
      houseType: House_TYPE.bungalow.value,
      maxFloor: 1
    } as Building;
    this.buildingService.save(building)
      .subscribe(() => this.commonService.success(() => this.commonService.back()));
  }
}
