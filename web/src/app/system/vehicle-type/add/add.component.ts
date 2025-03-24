import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {VehicleType} from '../../../../../projects/lib/src/entity/vehicle-type';
import {VehicleTypeService} from '../../../../../projects/lib/src/service/vehicle-type.service';
import {CommonService} from '../../../../../projects/lib/src/service/common.service';
import {VehicleTypeAsyncValidator} from '../vehicle-type-async-validator/vehicle-type-async-validator';

@Component({
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  keys = {
    name: 'name',
    weight: 'weight'
  }
  formGroup = new FormGroup({});

  constructor(private vehicleTypeService: VehicleTypeService,
              private commonService: CommonService,
              private vehicleTypeAsyncValidator: VehicleTypeAsyncValidator) {
  }

  ngOnInit(): void {
    this.initFormGroup();
  }

  initFormGroup(): void {
    this.formGroup.addControl(this.keys.name, new FormControl('', Validators.required, this.vehicleTypeAsyncValidator.vehicleTypeNameIsAvailable()));
    this.formGroup.addControl(this.keys.weight, new FormControl(null, Validators.required));
  }

  onSubmit(formGroup: FormGroup): void {
    const vehicleType = {
      name: formGroup.get(this.keys.name).value,
      weight: formGroup.get(this.keys.weight).value,
    } as VehicleType;
    this.vehicleTypeService.save(vehicleType)
      .subscribe(() => {
          this.commonService.success(() => this.commonService.back());
        },
        error => console.log('保存失败', error))
  }
}
