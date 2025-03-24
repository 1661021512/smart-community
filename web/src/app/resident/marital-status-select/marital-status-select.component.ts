import {Component, forwardRef, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {MARITAL_TYPES} from '../../../../projects/lib/src/entity/enum/marital-type';

/**
 * 婚烟状态选择组件
 * #432
 */
@Component({
  selector: 'app-marital-status-select',
  templateUrl: './marital-status-select.component.html',
  styleUrls: ['./marital-status-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => MaritalStatusSelectComponent)
    }
  ]
})
export class MaritalStatusSelectComponent implements OnInit, ControlValueAccessor {
  types = MARITAL_TYPES;
  formControl = new FormControl(this.types.married.value);

  constructor() {
  }

  ngOnInit(): void {
    return;
  }

  registerOnChange(fn: (value: number) => void): void {
    this.formControl.valueChanges.subscribe(value => fn(value));
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: number): void {
    this.formControl.setValue(obj);
  }
}
