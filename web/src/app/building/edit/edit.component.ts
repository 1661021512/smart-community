import {Component, OnInit} from '@angular/core';
import {Building} from '../../../../projects/lib/src/entity/building';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BuildingService} from '../../../../projects/lib/src/service/building.service';
import {ActivatedRoute} from '@angular/router';
import {Assert} from '@yunzhi/utils';
import {CommonService} from '../../../../projects/lib/src/service/common.service';
import {Village} from '../../../../projects/lib/src/entity/village';
import {House_TYPE} from "../../../../projects/lib/src/entity/enum/house-type";


/**
 * 住宅楼编辑
 */
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  building = new Building();
  formGroup = new FormGroup({});
  formKeys = {
    id: 'id',
    name: 'name',
    horizontalOffset: 'horizontalOffset',
    verticalOffset: 'verticalOffset',
    unitCount: 'unitCount',
    houseType: 'houseType',
    maxFloor: 'maxFloor',
    villageName: 'villageName',
    housesLengthOfFloor: 'housesLengthOfFloor'
  };
  village = new Village();

  constructor(private buildingService: BuildingService,
              private route: ActivatedRoute,
              private commonService: CommonService) {
  }

  ngOnInit(): void {
    this.formGroup.addControl(this.formKeys.name, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.villageName, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.horizontalOffset, new FormControl(null, Validators.required));
    this.formGroup.addControl(this.formKeys.verticalOffset, new FormControl(null, Validators.required));
    this.formGroup.addControl(this.formKeys.unitCount, new FormControl(null, Validators.required));
    this.formGroup.addControl(this.formKeys.houseType, new FormControl(null, Validators.required));
    this.formGroup.addControl(this.formKeys.maxFloor, new FormControl(null, Validators.required));
    this.formGroup.addControl(this.formKeys.housesLengthOfFloor, new FormControl(null, Validators.required));

    this.route.params.subscribe(params => {
      this.buildingService.getById(+params.id)
        .subscribe(building => this.setBuilding(building));
    })
    this.change();
  }

  setBuilding(building: Building): void {
    this.validateBuilding(building);
    this.formGroup.get(this.formKeys.id)?.setValue(building.id);
    this.formGroup.get(this.formKeys.name).setValue(building.name);
    this.formGroup.get(this.formKeys.villageName).setValue(building.village.name);
    this.formGroup.get(this.formKeys.horizontalOffset).setValue(building.horizontalOffset);
    this.formGroup.get(this.formKeys.verticalOffset).setValue(building.verticalOffset);
    this.formGroup.get(this.formKeys.unitCount).setValue(building.unitCount);
    this.formGroup.get(this.formKeys.houseType).setValue(building.houseType);
    this.formGroup.get(this.formKeys.maxFloor).setValue(building.maxFloor);
    this.formGroup.get(this.formKeys.housesLengthOfFloor).setValue(building.housesLengthOfFloor);
    this.building = building;
  }

  validateBuilding(building: Building): void {
    Assert.isObject(
      building,
      building.village,
      'some properties must be object'
    )
    Assert.isNumber(
      building.maxFloor,
      building.unitCount,
      building.houseType,
      building.verticalOffset,
      building.horizontalOffset,
      building.housesLengthOfFloor,
      'some properties must be number'
    )
    Assert.isString(
      building.name,
      building.village.name,
      'some properties must be string');

  }

  onSubmit(formGroup: FormGroup): void {
    const newBuilding = new Building({
        name: formGroup.get(this.formKeys.name).value,
        horizontalOffset: formGroup.get(this.formKeys.horizontalOffset).value,
        verticalOffset: formGroup.get(this.formKeys.verticalOffset).value,
        unitCount: formGroup.get(this.formKeys.unitCount).value,
        houseType: formGroup.get(this.formKeys.houseType).value,
        maxFloor: formGroup.get(this.formKeys.maxFloor).value,
        village: {id: this.building.village.id} as Village,
        housesLengthOfFloor: formGroup.get(this.formKeys.housesLengthOfFloor).value as number
    } as Building,
    );
    this.buildingService.update(this.building.id,newBuilding)
      .subscribe(
        () => {
          this.commonService.success(() => this.commonService.back());
        },
        error => console.log('保存失败', error));
  }

  /**
   当类型选择为平房时将每（单元）层户数设置为1
   */
  public change(): void{
    this.formGroup.get(this.formKeys.houseType).valueChanges.subscribe(() => {
      if(this.formGroup.get(this.formKeys.houseType).value === House_TYPE.bungalow.value) {
        this.formGroup.get(this.formKeys.housesLengthOfFloor).setValue(1);
      }
    })
  }
}
