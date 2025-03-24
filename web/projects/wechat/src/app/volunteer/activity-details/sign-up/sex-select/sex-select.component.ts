import {Component, forwardRef, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';

/**
 * 小程序性别选择组件
 * @author liguowen
 */
@Component({
  selector: 'wechat-sex-select',
  templateUrl: './sex-select.component.html',
  styleUrls: ['./sex-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => {
        return SexSelectComponent;
      })
    }
  ]
})
export class SexSelectComponent implements OnInit, ControlValueAccessor {

  /**
   * 分别用于绑定男和女两个formControl
   */
  trueFormControl = new FormControl(false);
  falseFormControl = new FormControl(false);

  constructor() {
  }

  ngOnInit(): void {
    return;
  }

  registerOnChange(fn: any): void {
    this.trueFormControl.valueChanges
      .subscribe(value => fn(value));
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(sex: boolean): void {
    this.falseFormControl.setValue(!sex);
    this.trueFormControl.setValue(sex);
  }

}
