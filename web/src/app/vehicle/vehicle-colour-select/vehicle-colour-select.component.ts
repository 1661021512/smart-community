import {Component, forwardRef, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Select2} from '../../share/select2/select2';
import {StatusEnum} from '../../../../projects/lib/src/entity/enum/statusEnum';
import {VEHICLE_COLOUR, VehicleColour} from '../../../../projects/lib/src/entity/enum/vehicle-colour';

@Component({
  selector: 'app-vehicle-colour-select',
  templateUrl: './vehicle-colour-select.component.html',
  styleUrls: ['./vehicle-colour-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => {
        return VehicleColourSelectComponent;
      })
    }
  ]
})
export class VehicleColourSelectComponent implements OnInit, ControlValueAccessor {

  vehicleColours = [] as Select2<number, string>[];
  vehicleColourSelect = new FormControl();

  constructor() {
  }

  ngOnInit(): void {
    for (let key in VEHICLE_COLOUR) {
      const value = VEHICLE_COLOUR[key] as StatusEnum<VehicleColour>
      this.vehicleColours.push(
          new Select2<number, string>({
            id: value.value, option: value.description, label: value.description
          })
      );
    }
  }

  registerOnChange(fn: any): void {
    this.vehicleColourSelect.valueChanges
      .subscribe(vehicleColourValue => fn(vehicleColourValue));
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(vehicleColourValue: number): void {
    this.vehicleColourSelect.setValue(vehicleColourValue);
  }

}
