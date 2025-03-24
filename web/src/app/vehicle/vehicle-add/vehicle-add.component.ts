import {Component, OnInit} from '@angular/core';
import {CommonService} from "../../../../projects/lib/src/service/common.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {VehicleBrand} from '../../../../projects/lib/src/entity/vehicle-brand';
import {PARKING_SPACE_TYPE} from '../../../../projects/lib/src/entity/enum/parking-space-type';
import {paringSpaceValidator} from '../validate/parking-space-validate';
import {Vehicle} from '../../../../projects/lib/src/entity/vehicle';
import {VehicleService} from '../../../../projects/lib/src/service/vehicle.service';
import {YzValidators} from '../../../../projects/lib/src/validator/yz-validators';
import {User} from '../../../../projects/lib/src/entity/user';

@Component({
  templateUrl: './vehicle-add.component.html',
  styleUrls: ['./vehicle-add.component.scss']
})
export class VehicleAddComponent implements OnInit {
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
  parkingSpaceTypes = PARKING_SPACE_TYPE;
  formGroup = new FormGroup({});

  constructor(private commonService: CommonService,
              private router: Router,
              private vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.initFormGroup();
}

  initFormGroup() {
    this.formGroup.addControl(this.formKeys.vehicleBrand, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.owner, new FormControl(null, [Validators.required, YzValidators.ownerExist]));
    this.formGroup.addControl(this.formKeys.plateNumber, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.vehicleTypeId, new FormControl(null, Validators.required));
    this.formGroup.addControl(this.formKeys.vehicleColour, new FormControl(null, Validators.required));
    this.formGroup.addControl(this.formKeys.plateNumber, new FormControl(''));
    this.formGroup.addControl(this.formKeys.parkingSpaceNumber, new FormControl(''));
    this.formGroup.addControl(this.formKeys.parkingSpaceType, new FormControl(null));
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

      this.vehicleService.save(newVehicle)
        .subscribe(() => this.commonService.success(
          () => {
            this.commonService.back();
          }
        ))
  }
}
