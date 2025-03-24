import {ControlValueAccessor, FormControl} from '@angular/forms';
import {Select2, SELECT2_MODEL} from './select2';
import {InjectionToken} from '@angular/core';

export interface Select2Service<T> extends ControlValueAccessor {

  get formControl(): FormControl;

  getModel(): SELECT2_MODEL;

  get items(): Select2<T, any>[];

  set items(items: Select2<T, any>[]);
}

export const SELECT2_SERVICE_TOKEN = new InjectionToken<Select2Service<any>>('Select2Service')
