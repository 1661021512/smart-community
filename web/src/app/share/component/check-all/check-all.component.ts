import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Checkbox} from '../../../../../projects/lib/src/modal/checkbox';
import {Observable} from 'rxjs';

/**
 * 全选
 * 传入checkboxes[] singleChange$
 * @author liguowen
 * #958
 */
@Component({
  selector: 'app-check-all',
  templateUrl: './check-all.component.html',
  styleUrls: ['./check-all.component.scss']
})
export class CheckAllComponent implements OnInit {

  /**
   * 全部选中 true ， 部分选中 null， 全未选中 false
   */
  _checked: boolean;
  /**
   * 传入的checkboxes
   */
  state = {
    checkboxes: [] as Checkbox[]
  }

  @Input()
  singleCheckboxChange$: Observable<void>;

  @Input()
  set checkboxes(checkboxes: Checkbox[]) {
    this.state.checkboxes = checkboxes;
    this.beChecked();
  }

  @Output()
  beChange = new EventEmitter<Checkbox[]>();

  formControl = new FormControl();

  constructor() {
  }

  ngOnInit(): void {
    // 监听singleChange$值变化，如果变化说明选择某一数据组件的值发生变化，重新判断是否选中
    if(this.singleCheckboxChange$ !== undefined)
    this.singleCheckboxChange$
      .subscribe(() => {
        this.beChecked();
      })
    this.formControl.valueChanges
      .subscribe(value => {
        // formControl值为true则checkboxes[]值全为true，值为false需要判断checkboxes[]状态
        // 如果当前checkboxes[]全为true则全变为false，否则不变
        if (value) {
          this.state.checkboxes.forEach(function (checkbox) {
            checkbox._checked = true;
          })
        } else if (this._checked === true) {
          this.state.checkboxes.forEach(function (checkbox) {
            checkbox._checked = false;
          })
        }
        this.beChange.emit(this.state.checkboxes);
      })
  }

  /**
   * 判断当前checkboxes[]中值
   * 如果全为true checked 为 true
   * 全为false checked 为 false
   * 否则checked为 null
   * checked为true时 组件为选中状态
   * 为false和null时为未选中状态
   */
  beChecked() {
    let n = 0;
    this.state.checkboxes.forEach(function (checkbox) {
     if (!checkbox._checked) {
        n++;
      }
    })
    // 父组件使用时存在传入空数组情况，此时为选中状态，但应该是不选中状态
    if(this.state.checkboxes.length === 0){
      this.formControl.setValue(false);
      return;
    }
    if (n === 0) {
      this._checked = true;
      this.formControl.setValue(true);
    } else if (n === this.state.checkboxes.length) {
      this._checked = false;
      this.formControl.setValue(false);
    } else {
      this._checked = null;
      this.formControl.setValue(false);
    }
  }

}
