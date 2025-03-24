import {Component, forwardRef, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {CultService} from '../../../../projects/lib/src/service/cult.service';

@Component({
  selector: 'app-cult-auto-complete',
  templateUrl: './cult-auto-complete.component.html',
  styleUrls: ['./cult-auto-complete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => CultAutoCompleteComponent)
    }
  ]
})
export class CultAutoCompleteComponent implements OnInit, ControlValueAccessor {
  formControl = new FormControl();
  items = [] as {id: number, name: string}[];

  constructor(private cultService: CultService) {
  }

  /**
   * 当输入的值变更时，请求后台返回数据
   * @param searchKey 输入值
   */
  onSearchKeyChange(searchKey: string) {
    this.cultService.getTop20ByNameContains(searchKey)
      .subscribe(value => this.items = value);
  }

  ngOnInit(): void {
    this.formControl.setValue({id: null});
  }

  registerOnChange(fn: (value: {id: number, name: string}) => void): void {
    this.formControl.valueChanges.subscribe(value => fn(value));
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: {id: number, name: string}): void {
    this.formControl.setValue(obj);
  }
}
