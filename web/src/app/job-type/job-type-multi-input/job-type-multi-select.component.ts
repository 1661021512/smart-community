import {Component, forwardRef} from '@angular/core';
import {JobTypeService} from '../../../../projects/lib/src/service/job-type.service';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {JobType} from '../../../../projects/lib/src/entity/jobType';

/**
 * 多项选择组件
 */
@Component({
  selector: 'app-job-type-multi-input',
  templateUrl: './job-type-multi-select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => JobTypeMultiSelectComponent)
    }
  ]
})
export class JobTypeMultiSelectComponent implements ControlValueAccessor {
  formControl = new FormControl([]);

  constructor(public multiSelectService: JobTypeService) {
  }

  registerOnChange(fn: (data: JobType[]) => void): void {
    this.formControl.valueChanges.subscribe(value => fn(value));
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: JobType[]): void {
    this.formControl.setValue(obj);
  }
}
