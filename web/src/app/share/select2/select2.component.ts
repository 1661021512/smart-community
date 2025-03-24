import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Select2} from './select2';
import {Assert} from '@yunzhi/utils';

/**
 * select助选组件
 * 注意传入、传出值为对象
 * @author panjie
 */
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'yz-select2',
  templateUrl: './select2.component.html',
  styleUrls: ['./select2.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => Select2Component)
    }
  ]
})
export class Select2Component<T> implements ControlValueAccessor {
  formControl = new FormControl();
  @Input()
  notFoundText = '未找到相关记录';

  state = {
    items: [] as Select2<T, any>[] // 所有选项
  }
  @Input()
  typeToSearchText = '请选择';

  constructor() {
  }

  get items(): Select2<T, any>[] {
    return this.state.items;
  }

  @Input()
  set items(items: Select2<T, any>[]) {
    items.forEach(item => {
      Assert.isDefined(item.id, item.label, item.option, '传入的参数未满足最低要求, 参数详情请参考Select2类');
    });
    this.state.items = items;
  }

  onSearch(searchKey: string, item: Select2<T, any>) {
    return item.searchFn(searchKey);
  };

  registerOnChange(fn: (data: T) => void): void {
    this.formControl.valueChanges.subscribe(data => {
      fn(data);
    });
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: T): void {
    this.formControl.setValue(obj);
  }
}
