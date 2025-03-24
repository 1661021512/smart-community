import {Component, forwardRef, OnInit} from '@angular/core';
import {VehicleTypeService} from '../../../../../projects/lib/src/service/vehicle-type.service';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Select2} from '../../../share/select2/select2';

/**
 * 车辆类型选择组件
 */
@Component({
  selector: 'app-vehicle-type-select',
  templateUrl: './vehicle-type-select.component.html',
  styleUrls: ['./vehicle-type-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => {
        return VehicleTypeSelectComponent;
      })
    }
  ]
})
export class VehicleTypeSelectComponent implements OnInit, ControlValueAccessor {

  vehicleTypes = [] as Select2<number, string>[];
  vehicleTypeId = new FormControl();

  constructor(private vehicleTypeService: VehicleTypeService) {
  }

  ngOnInit(): void {
    this.vehicleTypeService.getAll()
      .subscribe(vehicleTypes => {
        this.vehicleTypes = vehicleTypes
          .map(vehicleType => new Select2<number, string>({
            id: vehicleType.id, option: vehicleType.name, label: vehicleType.name
          }));
      });
  }

  registerOnChange(fn: any): void {
    this.vehicleTypeId.valueChanges
      .subscribe(vehicleTypeId => fn(vehicleTypeId));
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(vehicleTypeId: number): void {
    this.vehicleTypeId.setValue(vehicleTypeId);
  }

}
