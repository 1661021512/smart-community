import {FormControl} from '@angular/forms';
import {Select2Service} from './select2.service';
import {Select2, SELECT2_MODEL} from './select2';

export class Select2IdService implements Select2Service<number> {
  get formControl(): FormControl {
    return undefined;
  }

  getModel(): SELECT2_MODEL {
    return 'id';
  }

  get items(): Select2<number, any>[] {
    return [];
  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: any): void {
  }
}
