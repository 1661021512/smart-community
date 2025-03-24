import {Component, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {isNotNullOrUndefined} from '@yunzhi/utils';

/**
 * 自动完成输入组件
 * 参考：https://www.npmjs.com/package/angular-ng-autocomplete#getting-started
 */
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'yz-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => AutoCompleteComponent)
    }
  ]
})
export class AutoCompleteComponent implements ControlValueAccessor {
  @Output()
  doSearchKeyChange = new EventEmitter<string>();
  formControl = new FormControl();
  keyword = 'name';
  state = {
    items: [] as {id: any, name: string}[]
  }

  constructor() {
  }

  get items(): {id: any, name: string}[] {
    return this.state.items;
  }

  @Input()
  set items(items: {id: any, name: string}[]) {
    this.state.items = items;
  }

  selectEvent($event: {id: any, name: string}) {
    this.formControl.setValue($event);
  }

  onChangeSearch($event: string) {
    let item = this.formControl.value as {id: any, name: string};
    if (typeof item !== 'string' && isNotNullOrUndefined(item)) {
      item.id = null;
      item.name = $event;
    } else {
      item = {id: null, name: $event};
    }
    this.formControl.setValue({...item});
    this.doSearchKeyChange.emit($event);
  }

  registerOnChange(fn: (data: {id: any, name: string}) => void): void {
    this.formControl.valueChanges.subscribe(value => fn(value));
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: {id: any, name: string}): void {
    this.formControl.setValue(obj);
  }
}
