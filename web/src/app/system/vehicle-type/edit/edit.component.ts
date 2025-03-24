import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '../../../../../projects/lib/src/service/common.service';
import {Assert} from '@yunzhi/utils';
import {VehicleTypeService} from '../../../../../projects/lib/src/service/vehicle-type.service';
import {VehicleType} from '../../../../../projects/lib/src/entity/vehicle-type';
import {VehicleTypeAsyncValidator} from '../vehicle-type-async-validator/vehicle-type-async-validator';

@Component({
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  vehicleType: VehicleType;

  formGroup = new FormGroup({});
  formKeys = {
    id: 'id',
    name: 'name',
    weight: 'weight'
  }

  constructor(private router: Router,
              private route: ActivatedRoute,
              private vehicleTypeService: VehicleTypeService,
              private commonService: CommonService,
              private vehicleTypeAsyncValidator: VehicleTypeAsyncValidator) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params.id;
      Assert.isInteger(id, 'id must to int');
      // 根据id获取实体
      this.vehicleTypeService.getById(id)
        .subscribe((vehicleType: VehicleType) => {
            this.setVehicleType(vehicleType);
          }
        );
    })
  }

  setVehicleType(vehicleType: VehicleType) {
    // 校验字段
    this.validate(vehicleType);
    this.vehicleType = vehicleType;
    // 添加formControl，并设置value
    this.formGroup.addControl(this.formKeys.name, new FormControl(this.vehicleType.name, Validators.required, this.vehicleTypeAsyncValidator.vehicleTypeNameIsAvailable(vehicleType.id)));
    this.formGroup.addControl(this.formKeys.weight, new FormControl(this.vehicleType.weight, Validators.required));
  }

  onSubmit(formGroup: FormGroup): void {
    const newVehicleType = {
      name: formGroup.get(this.formKeys.name).value as string,
      weight: formGroup.get(this.formKeys.weight).value as number,
    } as VehicleType

    this.vehicleTypeService.update(this.vehicleType.id, newVehicleType)
      .subscribe(() => {
          this.commonService.success(() => this.commonService.back('../../', this.route));
        },
        error => console.log('保存失败', error))
  }

  validate(vehicleType: VehicleType) {
    Assert.isObject(vehicleType, 'vehicleType must be object');
    // 必须条件
    Assert.isDefined(
      vehicleType.name,
      vehicleType.weight,
      'vehicleType validate fail');
  }

}
