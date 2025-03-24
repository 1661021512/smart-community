import {Select2Service} from './select2.service';
import {Select2, SELECT2_MODEL} from './select2';
import {FormControl} from '@angular/forms';
import {Assert} from '@yunzhi/utils';

export class Select2ObjectService<T> implements Select2Service<T> {

  state = {
    items: [] as Select2<T, any>[], // 所有选项
    formControl: new FormControl()
  }

  get formControl(): FormControl {
    return this.state.formControl;
  }

  getModel(): SELECT2_MODEL {
    return 'object';
  }

  get items(): Select2<T, any>[] {
    return this.state.items;
  }

  set items(items: Select2<T, any>[]) {
    items.forEach(item => {
      Assert.isDefined(item.id, item.label, item.option, '传入的参数未满足最低要求, 参数详情请参考Select2类');
    });
    this.state.items = items;
  }

  registerOnChange(fn: (data: Select2<T, any>) => void): void {
    this.formControl.valueChanges.subscribe(data => {
      const items = this.items.filter(item => item.id === data);
      if (items.length > 1) {
        console.warn(self.name + ' 提供的 ID 并不唯一');
      }
      let item = items.length > 0 ? items[0] : null;
      fn(item);
    });
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: { id: T }): void {
    if (obj && obj.id) {
      this.formControl.setValue(obj.id);
    } else {
      this.formControl.setValue(null);
    }
  }

}
