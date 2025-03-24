import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {StatusEnum} from '../../../../projects/lib/src/entity/enum/statusEnum';
import {EducationType} from '../../../../projects/lib/src/entity/enum/education-type';
import {EDUCATION_TYPE} from '../../../../projects/lib/src/entity/enum/education-type';

/**
 * 文件程度组件
 * #411
 */
@Component({
  selector: 'app-education-select',
  templateUrl: './education-select.component.html',
  styleUrls: ['./education-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => {
        return EducationSelectComponent;
      })
    }
  ]
})
export class EducationSelectComponent implements OnInit, ControlValueAccessor {
  educationSelected = new FormControl();
  educations = [] as {
    id: number,
    name: string,
  }[];

  /**
   * 是否显示 请选择
   */
  @Input()
  isShowPleaseSelect = true;

  constructor() {
  }

  writeValue(value: number | string): void {
    let educationId = value;
    if (typeof value === 'string') {
      educationId = +value;
    }
    if (!Number.isInteger(educationId)) {
      educationId = null;
    }
    this.educationSelected.setValue(educationId);
  }

  registerOnChange(fn: (data: number) => void): void {
    this.educationSelected.valueChanges
      .subscribe((data: number) => {
        fn(data);
      });
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState?(isDisabled: boolean): void {
  }

  ngOnInit(): void {
    for (let key in EDUCATION_TYPE) {
      const value = EDUCATION_TYPE[key] as StatusEnum<EducationType>;
      this.educations.push(
        {
          id: value.value,
          name: value.description
        }
      )
    }
  }
}
