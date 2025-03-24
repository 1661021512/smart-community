import {Component, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';

/**
 * 多选checkbox框
 * 使用方法详见单元测试
 * @author panjie
 */
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'yz-checkboxes',
  templateUrl: './checkboxes.component.html',
  styleUrls: ['./checkboxes.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => CheckboxesComponent)
    }
  ]
})
export class CheckboxesComponent<T> implements ControlValueAccessor {
  /**
   * 由于checkbox改变时，并未改变数组对象。
   * 所以父组件需要需要显式的感知数据变化时，可以订阅本数据弹出器
   */
  @Output()
  doChange = new EventEmitter<T[]>();
  formControl = new FormControl([] as T[]);
  state = {
    list: [] as { value: T, name: string }[]
  }

  constructor() {
  }

  get list(): { value: T, name: string }[] {
    return this.state.list;
  }

  @Input()
  set list(list: { value: T, name: string }[]) {
    this.state.list = list;
  }

  registerOnChange(fn: (data: T[]) => void): void {
    this.formControl.valueChanges.subscribe(data => fn(data));
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.formControl.disable() : this.formControl.enable();
  }

  writeValue(obj: T[]): void {
    this.formControl.setValue(obj);
  }

  onChange(value: T, checked: boolean): void {
    const values = this.formControl.value as T[];
    const index = values.indexOf(value);
    if (checked && (index === -1)) {
      values.push(value);
    } else if (!checked && (index !== -1)) {
      values.splice(index, 1);
    }
    this.doChange.emit(values);
  }

  getDefaultChecked(value: T): boolean {
    return this.formControl.value.includes(value);
  }
}
