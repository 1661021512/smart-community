import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {POLITICAL_TYPE, politicalType} from '../../../../projects/lib/src/entity/enum/political-type';
import {StatusEnum} from '../../../../projects/lib/src/entity/enum/statusEnum';

/**
 * 政治面貌选择组件
 * #410
 * @Author weiweiyi;
 */

@Component({
  selector: 'app-political-climate-select',
  templateUrl: './political-climate-select.component.html',
  styleUrls: ['./political-climate-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => {
        return PoliticalClimateSelectComponent;
      })
    }]
})
export class PoliticalClimateSelectComponent implements OnInit, ControlValueAccessor {

  constructor() {
  }

  politicalClimates = [] as {
    id: number,
    name: string
  }[];

  politicalClimateSelected = new FormControl(null);

  /**
   * 是否显示 请选择
   */
  state = {
    showPleaseSelect: true
  }

  @Input()
  set isShowPleaseSelect(isShowPleaseSelect: boolean) {
    this.state.showPleaseSelect = isShowPleaseSelect;
  }

  ngOnInit(): void {

    for (let key in POLITICAL_TYPE) {
      const value = POLITICAL_TYPE[key] as StatusEnum<politicalType>
      this.politicalClimates.push(
        {
          id: value.value,
          name: value.description
        }
      );
    }
  }

  /**
   * 组件需要向父组件弹值时，直接调用参数中的fn方法
   * 相当于@Output()
   * @param fn 此类型取决于当前组件的弹出值类型，如当前弹出一个类型为number的id
   */

  registerOnChange(fn: (data: number) => void): void {
    this.politicalClimateSelected.valueChanges
      .subscribe((data: number) => {
        fn(data);
      });
  }

  /**
   * 将FormControl中的值通过此方法写入
   * FormControl的值每变化一次，该方法被重新执行一次
   * 相当于@Input() set xxx
   * @param value 此类型取决于当前组建的接收类型，如我们接受一个类型为number的id
   */
  writeValue(value: number | string): void {
    let politicalClimateId = value;
    if (typeof value === 'string') {
      politicalClimateId = +value;
    }
    if (!Number.isInteger(politicalClimateId)) {
      politicalClimateId = null;
    }
    this.politicalClimateSelected.setValue(politicalClimateId);
  }

  registerOnTouched(fn: any): void {
  }

}
