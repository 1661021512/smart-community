import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {VehicleBrand} from "../../../../../projects/lib/src/entity/vehicle-brand";
import {VehicleBrandAsyncValidator} from '../vehicle-brand-async-validator/vehicle-brand-async-validator';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  @Input()
  vehicleBrand: VehicleBrand;

  @Output()
  beClose = new EventEmitter<void>();
  @Output()
  beSubmit = new EventEmitter<VehicleBrand>();

  formGroup = new FormGroup({});
  formKeys = {
    name: 'name'
  }

  constructor(private vehicleBrandAsyncValidator: VehicleBrandAsyncValidator) { }

  ngOnInit(): void {
    this.formGroup.addControl(this.formKeys.name, new FormControl(this.vehicleBrand.name, Validators.required, this.vehicleBrandAsyncValidator.vehicleBrandNameNotExist()));
  }
  onClose() {
    this.beClose.emit(null);
  }
  onSubmit(formGroup: FormGroup) {
    this.vehicleBrand.name = formGroup.get(this.formKeys.name).value as string;
    this.beSubmit.emit(this.vehicleBrand);
  }

}
