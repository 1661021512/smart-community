import {Component, forwardRef} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {EnterpriseService} from '../../../../projects/lib/src/service/enterprise.service';
import {Enterprise} from '../../../../projects/lib/src/entity/enterprise';

/**
 * 自动完成输入
 */
@Component({
  selector: 'app-enterprise-auto-complete',
  templateUrl: './enterprise-auto-complete.component.html',
  styleUrls: ['./enterprise-auto-complete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => EnterpriseAutoCompleteComponent)
    }
  ]
})
export class EnterpriseAutoCompleteComponent implements ControlValueAccessor {
  formControl = new FormControl();
  items = [] as Enterprise[];

  constructor(private enterpriseService: EnterpriseService) {
  }

  registerOnChange(fn: (data: {id: number, name: string}) => void): void {
    this.formControl.valueChanges.subscribe(value => fn(value));
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: {id: number, name: string}): void {
    this.formControl.setValue(obj);
  }

  onSearchKeyChange($event: string) {
    this.enterpriseService.findTop20ByNameContains($event)
      .subscribe(value => this.items = value);
  }
}
