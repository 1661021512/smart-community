import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {randomString} from '@yunzhi/utils';

@Component({
  selector: 'app-true-or-false',
  templateUrl: './true-or-false.component.html',
  styleUrls: ['./true-or-false.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => TrueOrFalseComponent)
    }
  ]
})
export class TrueOrFalseComponent implements OnInit, ControlValueAccessor {
  formControl = new FormControl(null);
  id = randomString('true_or_false', 10);
  
  @Input()
  labels = {
    true: '是',
    false: '否'
  }

  constructor() {
  }

  ngOnInit(): void {
    return;
  }

  registerOnChange(fn: any): void {
    this.formControl.valueChanges.subscribe(value => fn(value));
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: boolean): void {
    this.formControl.setValue(obj);
  }

}
