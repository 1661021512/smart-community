import { Component, OnInit } from '@angular/core';
import {PARKING_SPACE_TYPE} from '../../../../projects/lib/src/entity/enum/parking-space-type';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CommonService} from '../../../../projects/lib/src/service/common.service';
import {ActivatedRoute, Router} from '@angular/router';
import {VehicleService} from '../../../../projects/lib/src/service/vehicle.service';
import {YzValidators} from '../../../../projects/lib/src/validator/yz-validators';
import {paringSpaceValidator} from '../validate/parking-space-validate';
import {VehicleBrand} from '../../../../projects/lib/src/entity/vehicle-brand';
import {Vehicle} from '../../../../projects/lib/src/entity/vehicle';
import {Assert} from '@yunzhi/utils';

@Component({
  templateUrl: './vehicle-edit.component.html',
  styleUrls: ['./vehicle-edit.component.scss']
})
export class VehicleEditComponent implements OnInit {
  formKeys = {
    vehicleBrand: 'vehicleBrand',
    owner: 'owner',
    plateNumber: 'plateNumber',
    vehicleTypeId: 'vehicleTypeId',
    vehicleColour: 'vehicleColour',
    parkingSpaceNumber: 'parkingSpaceNumber',
    parkingSpaceType: 'parkingSpaceType',
    communityWorkerId: 'communityWorkerId'
  }
  vehicle: Vehicle;
  parkingSpaceTypes = PARKING_SPACE_TYPE;
  formGroup = new FormGroup({});

  constructor(private commonService: CommonService,
              private router: Router,
              private route: ActivatedRoute,
              private vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params.id;
      Assert.isInteger(id, 'id must to int');
      // 根据id获取实体
      this.vehicleService.getById(id)
        .subscribe((vehicle) => {
            this.setVehicle(vehicle);
          }
        );
    })
  }

  setVehicle(vehicle: Vehicle) {
    // 校验数据
    this.validateVehicle(vehicle);
    this.vehicle = vehicle;
    this.formGroup.addControl(this.formKeys.vehicleBrand, new FormControl(vehicle.brand, Validators.required));
    this.formGroup.addControl(this.formKeys.owner, new FormControl(vehicle.owner, [Validators.required, YzValidators.ownerExist]));
    this.formGroup.addControl(this.formKeys.plateNumber, new FormControl(vehicle.plateNumber, Validators.required));
    this.formGroup.addControl(this.formKeys.vehicleTypeId, new FormControl(vehicle.type.id, Validators.required));
    this.formGroup.addControl(this.formKeys.vehicleColour, new FormControl(vehicle.colour, Validators.required));
    this.formGroup.addControl(this.formKeys.parkingSpaceNumber, new FormControl(vehicle.parkingSpaceNumber));
    this.formGroup.addControl(this.formKeys.parkingSpaceType, new FormControl(vehicle.parkingSpaceType));
    // 添加formControl之后 添加跨字段验证器
    this.formGroup.setValidators(paringSpaceValidator);
    // 当停车位清空时 停车位类型也清空
    this.formGroup.get(this.formKeys.parkingSpaceNumber).valueChanges.subscribe((value) =>{
      if (!value) {
        this.formGroup.get(this.formKeys.parkingSpaceType).setValue(null);
      }
    })
  }


  onSubmit(formGroup: FormGroup) {
    const newVehicleBrand = new VehicleBrand({
      id: formGroup.get(this.formKeys.vehicleBrand).value.id as number,
      name: formGroup.get(this.formKeys.vehicleBrand).value.name as string
    });
    const newVehicle = {
      owner: formGroup.get(this.formKeys.owner).value,
      plateNumber: formGroup.get(this.formKeys.plateNumber).value,
      brand: newVehicleBrand,
      type: {id: formGroup.get(this.formKeys.vehicleTypeId).value},
      colour: formGroup.get(this.formKeys.vehicleColour).value,
      parkingSpaceNumber: formGroup.get(this.formKeys.parkingSpaceNumber).value,
      parkingSpaceType: formGroup.get(this.formKeys.parkingSpaceType).value,
    }as Vehicle;

    this.vehicleService.update(this.vehicle.id, newVehicle)
      .subscribe(() => this.commonService.success(
        () => {
          this.commonService.back();
        }
      ))
  }

  /**
   * 校验字段
   */
  validateVehicle(vehicle: Vehicle): void {
    // 必有条件
    Assert.isNotNullOrUndefined(
      vehicle.owner,
      vehicle.colour,
      vehicle.type,
      vehicle.plateNumber,
      vehicle.brand,
      'vehicle validate fail'
    );
    Assert.isNotNullOrUndefined(
      vehicle.type.id,
      '未满足初始化条件'
    )
  }

}
