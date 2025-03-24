import {Component, forwardRef} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {ReligiousBeliefService} from '../../../../projects/lib/src/service/religious-belief.service';
import {ReligiousBelief} from '../../../../projects/lib/src/entity/religious-belief';

/**
 * 宗教信仰
 * author zhangrui
 * #555
 */
@Component({
  selector: 'app-religious-belief-auto-complete',
  templateUrl: './religious-belief-auto-complete.component.html',
  styleUrls: ['./religious-belief-auto-complete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => ReligiousBeliefAutoCompleteComponent)
    }
  ]
})
export class ReligiousBeliefAutoCompleteComponent implements ControlValueAccessor {
  formControl = new FormControl();
  items = [] as ReligiousBelief[];

  constructor(private religiousBeliefService: ReligiousBeliefService) {
  }

  registerOnChange(fn: (data: { id: number, name: string }) => void): void {
    this.formControl.valueChanges.subscribe(value => fn(value));
  }

  registerOnTouched(fn: any) {
  }

  writeValue(obj: { id: number, name: string }): void {
    this.formControl.setValue(obj);
  }

  onSearchKeyChange($event: string) {
    this.religiousBeliefService.findTop20ByNameContains($event)
      .subscribe(value => this.items = value);
  }
}
