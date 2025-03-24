import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Unit} from '../../../../../projects/lib/src/entity/unit';
import {BuildingService} from '../../../../../projects/lib/src/service/building.service';
import {ActivatedRoute} from '@angular/router';
import {HouseService} from '../../../../../projects/lib/src/service/house.service';
import {CommonService} from '../../../../../projects/lib/src/service/common.service';
import {HouseOwnType} from '../../../../../projects/lib/src/entity/enum/house-own-type';
import {House} from '../../../../../projects/lib/src/entity/house';
import {Building} from "../../../../../projects/lib/src/entity/building";
import {UnitService} from "../../../../../projects/lib/src/service/unit.service";
import {House_TYPE, HouseType} from "../../../../../projects/lib/src/entity/enum/house-type";

@Component({
  selector: 'app-building-type',
  templateUrl: './building-type.component.html',
  styleUrls: ['./building-type.component.scss']
})
export class BuildingTypeComponent implements OnInit {

  formGroup = new FormGroup({});
  unitFormGroup = new FormGroup({});
  formKeys = {
    villageId: 'villageId',
    unitId: 'unitId',
    floor: 'floor',
    unitName: 'unitName',
    name: 'name',
    weight: 'weight',
    type: 'type',
    area: 'area',
    lowIncoming: 'lowIncoming',
    relief: 'relief',
    checkInTime: 'checkInTime',
    remarks: 'remarks',
    buildingId: 'buildingId'
  }
  maxFloor: number;
  unit = {} as Unit;
  showModal = false;
  houseTypes = House_TYPE;
  /**
   * 房屋类型默认为楼房
   */
  @Input()
  houseType = House_TYPE.building.value as HouseType;

  /**
   * @param showUnitFormControl
   * 用于新增单元时初始化单元组件
   */
  showUnitFormControl = true;

  constructor(private buildingService: BuildingService,
              private route: ActivatedRoute,
              private houseService: HouseService,
              private commonService: CommonService,
              private unitService: UnitService) {
    // fromGroup2初始化
    this.unitFormGroup.addControl(this.formKeys.unitName, new FormControl(null, Validators.required));

    // fromGroup1初始化
    this.formGroup.addControl(this.formKeys.floor, new FormControl(null, Validators.required));
    this.formGroup.addControl(this.formKeys.unitId, new FormControl(null, Validators.required));
    this.formGroup.addControl(this.formKeys.name, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.weight, new FormControl(10, Validators.required));
    this.formGroup.addControl(this.formKeys.type, new FormControl(null, Validators.required));
    this.formGroup.addControl(this.formKeys.villageId, new FormControl());
    this.formGroup.addControl(this.formKeys.area, new FormControl(0));
    this.formGroup.addControl(this.formKeys.lowIncoming, new FormControl(false));
    this.formGroup.addControl(this.formKeys.relief, new FormControl(false));
    this.formGroup.addControl(this.formKeys.checkInTime, new FormControl(null));
    this.formGroup.addControl(this.formKeys.remarks, new FormControl(''));
    this.formGroup.addControl(this.formKeys.buildingId, new FormControl());
  }


  ngOnInit(): void {
    // villageId变化时 楼栋选择组件置为请选择
    this.formGroup.get(this.formKeys.villageId).valueChanges
      .subscribe(() => {
        this.formGroup.get(this.formKeys.buildingId).setValue(null);
      })

    // 若是平房则不用验证unit为必须字段，设置房屋层数为1
    if(this.houseType === House_TYPE.bungalow.value){
      this.formGroup.get(this.formKeys.floor).setValue(1);
      this.formGroup.get(this.formKeys.unitId).clearValidators()
    }

    this.formGroup.get(this.formKeys.buildingId).valueChanges
      .subscribe(buildingId => {
        if (Number.isInteger(buildingId)) {
          this.buildingService.getById(buildingId)
            .subscribe(building => {
              this.maxFloor = building.maxFloor;
            })
        } else {
          this.maxFloor = 0;
        }
        // buildingId变化时 单元选择组件置为请选择
        this.formGroup.get(this.formKeys.unitId).setValue(null);
      })
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
      unit: {id: formGroup.get(this.formKeys.unitId).value as number} as Unit,
      weight: formGroup.get(this.formKeys.weight).value as number
    } as House;
    const buildingId = formGroup.get(this.formKeys.buildingId).value;
    this.houseService.save(house, this.houseType, buildingId)
      .subscribe(() => this.commonService.success(() => this.commonService.back('../', this.route)));
  }

  unitOnSubmit(formGroup: FormGroup) {
    // 获取最大目前楼栋下最大weight
    const buildingId = this.formGroup.get(this.formKeys.buildingId).value as number;
     this.unitService.getByBuilding(buildingId).subscribe((units) => {
        let maxWeight = 0;
          units.forEach((unit) => {
            if(unit.weight > maxWeight){
              maxWeight = unit.weight
            }
          })
       const unit = {
         name: formGroup.get(this.formKeys.unitName).value as string,
         weight: maxWeight +1,
         building: {id: buildingId} as Building
       }
       this.unitService.save(unit).subscribe(() => {
         // 新增单元成功
         this.commonService.success();
         this.showModal = false;

         // 初始化单元选择组件
         this.showUnitFormControl = false;
         // 100ms后再设置为true
         setInterval(() =>{
           this.showUnitFormControl = true
         } ,100);

         // 单元选择组件设置为请选择
         this.formGroup.get(this.formKeys.unitId).setValue(null);
         // 新增单元名字fromControl设置为空
         this.unitFormGroup.get(this.formKeys.unitName).setValue(null);
       });
     })
  }
  onClickModal(){
    this.showModal = true;
  }

  onCloseModal() {
    this.showModal = false;
    // 新增单元名字fromControl设置为空
    this.unitFormGroup.get(this.formKeys.unitName).setValue(null);
  }
}
