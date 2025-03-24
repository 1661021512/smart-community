import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {HOUSE_OWN_TYPE, HouseOwnType} from '../../../../projects/lib/src/entity/enum/house-own-type';
import {StatusEnum} from '../../../../projects/lib/src/entity/enum/statusEnum';
import {randomString} from "@yunzhi/utils";

/**
 * 房屋拥有有性质（自有或租赁）组件
 * #372
 * @author weiweiyi
 */
@Component({
  selector: 'app-house-own-type-radio',
  templateUrl: './house-own-type-radio.component.html',
  styleUrls: ['./house-own-type-radio.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => {
        return HouseOwnTypeRadioComponent;
      })
    }]
})
export class HouseOwnTypeRadioComponent implements OnInit, ControlValueAccessor {

  /**
   * label组件生成随机id
   */
  id =  randomString();
  ownedRadioControl = new FormControl(null);
  /**
   * 房屋使用性质
   */
  ownedRadios = [] as {
    id: HouseOwnType,
    name: string
  }[];
  @Input()
  showSelectAll = true;

  constructor() {
  }

  ngOnInit(): void {
    for (let key in HOUSE_OWN_TYPE) {
      const value = HOUSE_OWN_TYPE[key] as StatusEnum<HouseOwnType>;
      this.ownedRadios.push({
          id: value.value as HouseOwnType,
          name: value.description as string
        }
      )
    }
  }

  /**
   * 组件需要向父组件弹值时，直接调用参数中的fn方法
   * 相当于@Output()
   * @param fn 此类型取决于当前组件的弹出值类型，如当前弹出一个类型为number的id
   */

  registerOnChange(fn: (data: number) => void): void {
    this.ownedRadioControl.valueChanges
      .subscribe((data: number) => {
        fn(data);
      });
  }

  registerOnTouched(fn: any): void {
  }

  /**
   * 将FormControl中的值通过此方法写入
   * FormControl的值每变化一次，该方法被重新执行一次
   * 相当于@Input() set xxx
   * @param value 此类型取决于当前组建的接收类型，如我们接受一个类型为number的id
   */
  writeValue(value: number | string): void {
    let houseOwnType = value;
    if (typeof value === 'string') {
      houseOwnType = +value;
    }
    if (!Number.isInteger(houseOwnType)) {
      houseOwnType = null;
    }
    this.ownedRadioControl.setValue(houseOwnType);
  }
}
