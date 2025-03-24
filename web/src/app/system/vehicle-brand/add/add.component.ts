import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {VehicleBrand} from "../../../../../projects/lib/src/entity/vehicle-brand";
import {VehicleBrandService} from "../../../../../projects/lib/src/service/vehicle-brand.service";
import {CommonService} from "../../../../../projects/lib/src/service/common.service";
import {YzAsyncValidators} from "../../../../../projects/lib/src/validator/yz-async-validators";
import {VehicleBrandAsyncValidator} from "../vehicle-brand-async-validator/vehicle-brand-async-validator";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  formKeys = {
    name: 'name'
  };
  formGroup = new FormGroup({});

  constructor(private vehicleBrandService: VehicleBrandService,
              private commonService: CommonService,
              private vehicleBrandAsyncValidator: VehicleBrandAsyncValidator) {
  }

  ngOnInit(): void {
    this.formGroup.addControl(this.formKeys.name, new FormControl('', Validators.required, this.vehicleBrandAsyncValidator.vehicleBrandNameNotExist()));
    return;
  }

  onSubmit(formGroup: FormGroup) {
    const newVehicleBrand = new VehicleBrand({
      name: formGroup.get(this.formKeys.name).value as string
    });

    this.vehicleBrandService.save(newVehicleBrand)
      .subscribe(() => this.commonService.success(
        () => {
          this.commonService.back();
        }
      ))
  }
}
