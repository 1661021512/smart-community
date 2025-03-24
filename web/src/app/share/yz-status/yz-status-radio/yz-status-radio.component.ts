import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {StatusEnum} from '../status-enum';
import {randomNumber} from '@yunzhi/utils';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'yz-status-radio',
  templateUrl: './yz-status-radio.component.html',
  styleUrls: ['./yz-status-radio.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => YzStatusRadioComponent)
  }]
})
export class YzStatusRadioComponent<T> implements ControlValueAccessor {
  formControl = new FormControl(null);
  state = {
    types: {} as {[key: string]: StatusEnum<T>},
    isShowPleaseSelect: false
  }
  statuses = [] as StatusEnum<T>[];
  id = randomNumber();
  constructor() {
  }

  get isShowPleaseSelect(): boolean {
    return this.state.isShowPleaseSelect;
  };

  @Input()
  set isShowPleaseSelect(isShowPleaseSelect: boolean) {
    this.state.isShowPleaseSelect = isShowPleaseSelect;
  }

  get types(): {[key: string]: StatusEnum<T>} {
    return this.state.types;
  }

  @Input()
  set types(status: {[key: string]: StatusEnum<T>}) {
    this.state.types = status;
    this.statuses = [];
    for (let key in status) {
      this.statuses.push(status[key]);
    }
  }

  registerOnChange(fn: (data: T) => void): void {
    this.formControl.valueChanges.subscribe(value => fn(value));
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.formControl.disable() : this.formControl.enable();
  }

  writeValue(obj: T): void {
    this.formControl.setValue(obj);
  }
}
