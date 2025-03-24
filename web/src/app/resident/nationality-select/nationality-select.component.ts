import {Component, forwardRef, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Nationality_TYPE} from "../../../../projects/lib/src/entity/enum/nationality-type";

/**
 * 56个民族选择组件
 * #409
 */
@Component({
  selector: 'app-nationality-select',
  templateUrl: './nationality-select.component.html',
  styleUrls: ['./nationality-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => {
        return NationalitySelectComponent;
      })
    }
  ]
})
export class NationalitySelectComponent implements OnInit, ControlValueAccessor {

  /**所有民族*/
  nationalities = [] as {
    id: number,
    value: string
  }[];
  /**民族id*/
  nationalityId = new FormControl();

  constructor() {
  }

  ngOnInit(): void {
    this.nationalityId.setValue(1);
    const enums = Object.entries(Nationality_TYPE);
    for (let i = 0; i < enums.length; i++) {
      this.nationalities.push(
        {
          id: enums[i][1].value,
          value: enums[i][1].description
        }
      )
    }
  }

  registerOnChange(fn: (data: number) => void): void {
    this.nationalityId.valueChanges
      .subscribe(data => fn(data));
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(value: number | string): void {
    let nationalityId = value;
    if (typeof value === 'string') {
      nationalityId = +value;
    }
    if (!Number.isInteger(nationalityId)) {
      nationalityId = null;
    }
    this.nationalityId.setValue(nationalityId);
  }
}
