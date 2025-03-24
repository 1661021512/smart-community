import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Unit} from '../../../../projects/lib/src/entity/unit';
import {UnitService} from '../../../../projects/lib/src/service/unit.service';


/**
 * 单元选择
 * Author zhangrui
 */
@Component({
  selector: 'app-unit-select',
  templateUrl: './unit-select.component.html',
  styleUrls: ['./unit-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => {
        return UnitSelectComponent;
      })
    }
  ]
})
export class UnitSelectComponent implements OnInit, ControlValueAccessor {

  unitSelected = new FormControl(null);
  // 所有单元
  units = new Array<Unit>();

  constructor(private unitService: UnitService) {
  }

  // 接收父组件输入的buildingId
  @Input()
  set buildingId(buildingId: number) {
    if (Number.isInteger(buildingId)) {
      this.unitService.getByBuilding(buildingId)
        .subscribe(units => {
          this.units = units;
        })
    } else {
      this.units = [];
    }
  }

  ngOnInit(): void {
    // this.unitService.getAll().subscribe( units => {
    //   this.units = units;
    // })
    return;
  }

  // 向父组件弹值
  registerOnChange(fn: any): void {
    this.unitSelected.valueChanges.subscribe(value => fn(value));
  }

  registerOnTouched(fn: any): void {
  }


  // 父组件写入
  // 当前组件将被作为formControl来使用，当父组件的FormControl值发生变更时，将调用writeValue
  writeValue(value: number | string): void {
    let unitId = value;
    if (typeof value === 'string') {
      unitId = +value;
    }
    if (!Number.isInteger(unitId)) {
      unitId = null;
    }
    this.unitSelected.setValue(unitId);
  }
}
