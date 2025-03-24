import {Component, forwardRef} from '@angular/core';
import {House_TYPE, HouseType} from '../../../../projects/lib/src/entity/enum/house-type';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';

/**
 * 房屋类型(平房、楼房)选择组件
 */
@Component({
  selector: 'app-house-type-radio',
  templateUrl: './house-type-radio.component.html',
  styleUrls: ['./house-type-radio.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => HouseTypeRadioComponent)
    }
  ]
})
export class HouseTypeRadioComponent implements ControlValueAccessor {
  types = House_TYPE;
  formControl = new FormControl();

  constructor() {
  }

  registerOnChange(fn: (value: HouseType) => void): void {
    this.formControl.valueChanges.subscribe(value => fn(value));
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: HouseType): void {
    this.formControl.setValue(obj);
  }
}
