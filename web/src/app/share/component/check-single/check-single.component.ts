import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';

/**
 * 应用在table列表中的选择某一行组件
 * 传入checked
 * @author liguowen
 * #957
 */
@Component({
  selector: 'app-check-single',
  templateUrl: './check-single.component.html',
  styleUrls: ['./check-single.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => CheckSingleComponent)
    }
  ]
})
export class CheckSingleComponent implements OnInit {
  @Input()
  set checked(checked: boolean) {
    this.formControl.setValue(checked);
  }

  @Output()
  beChange = new EventEmitter<boolean>();

  formControl = new FormControl(false);

  constructor() {
  }

  ngOnInit(): void {
    this.formControl.valueChanges
      .subscribe(value => {
        this.beChange.emit(value);
      })
  }

}
