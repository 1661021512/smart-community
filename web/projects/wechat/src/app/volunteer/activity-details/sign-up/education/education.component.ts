import {Component, forwardRef, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {EDUCATION_TYPE} from '../../../../../../../lib/src/entity/enum/education-type';

/**
 * 小程序文化程度组件
 */
@Component({
  selector: 'wechat-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => {
        return EducationComponent;
      })
    }
  ]
})
export class EducationComponent implements OnInit,ControlValueAccessor {

  /**
   * 所有文化程度
   */
  educationTypes = [] as {
    id: number,
    value: string
  }[];
  formControl = new FormControl();

  constructor() { }

  ngOnInit(): void {
    const enums = Object.entries(EDUCATION_TYPE);
    for (let i = 0; i < enums.length; i++) {
      this.educationTypes.push(
        {
          id: enums[i][1].value,
          value: enums[i][1].description
        }
      )
    }
    return;
  }

  registerOnChange(fn: any): void {
    this.formControl.valueChanges
      .subscribe(value => fn(value));
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(education: number): void {
    this.formControl.setValue(education);
  }

}
