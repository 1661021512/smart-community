import {Component, forwardRef, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Assert} from '@yunzhi/utils';

/**
 * 日期组件
 * #530
 */
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'yz-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => DateComponent)
    }
  ]
})
export class DateComponent implements OnInit, ControlValueAccessor {

  formControl = new FormControl();

  constructor() {
  }

  ngOnInit(): void {
    return;
  }

  registerOnChange(fn: (number) => void): void {
    this.formControl.valueChanges.subscribe(data => {
      fn(this.getTimeStamp(data));
    });
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: number): void {
    if (obj === null || obj === undefined) {
      this.formControl.setValue(null);
    } else {
      Assert.isInteger(obj, 'yz-date组件接收的类型必须为number，但当前传入类型为: ' + typeof obj);
      this.formControl.setValue(this.getTime(obj));
    }
  }

  /**
   * 把时间戳转化为 y-m-r 形式
   * @param timeStamp 时间戳
   */
  getTime(timeStamp: number): string {
    const date = new Date(timeStamp);
    const year = date.getFullYear().toString();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);
  }

  /**
   * 将 y-m-d 转化为 时间戳
   * @param time 时间
   */
  getTimeStamp(time: string | null | undefined): number {
    if (time == null || typeof time === 'undefined') {
      return null;
    }
    const date = new Date(time);
    return date.valueOf();
  }
}
