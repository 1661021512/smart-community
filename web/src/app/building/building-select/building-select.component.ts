import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {Building} from '../../../../projects/lib/src/entity/building';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {BuildingService} from '../../../../projects/lib/src/service/building.service';
import {House_TYPE, HouseType} from "../../../../projects/lib/src/entity/enum/house-type";

/**
 * 楼房选择
 * Author Chenliting
 * #370
 */
@Component({
  selector: 'app-building-select',
  templateUrl: './building-select.component.html',
  styleUrls: ['./building-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => {
        return BuildingSelectComponent;
      })
    }]
})
export class BuildingSelectComponent implements OnInit,ControlValueAccessor {
  buildingSelected = new FormControl(null);
  buildings = new Array<Building>()

  constructor(private buildingService: BuildingService) {
  }

  @Input()
  set villageId(villageId: number) {
    if (Number.isInteger(villageId)) {
      this.buildingService.getByVillage(villageId)
        .subscribe(buildings => {
          this.buildings = buildings;
        })
    } else {
      this.buildings = [];
    }

  }

  ngOnInit(): void {
    return;
  }

  /**
   * 将用户选择其它的building时，向父组件弹值
   * 注：由于当前组件将被作为formControl来使用，所以使用该方法弹值
   * @param fn
   */
  registerOnChange(fn: (data: number) => void): void {
    this.buildingSelected.valueChanges.subscribe(value => fn(value));
  }

  registerOnTouched(fn: any): void {
  }

  /**
   * 父组件写入
   * 注：由于当前组件将被作为formControl来使用，当父组件的FormControl值发生变更时，将调用writeValue
   * @param value
   */
  writeValue(value: number | string): void {
    let buildingId = value;
    if (typeof value === 'string') {
      buildingId = +value;
    }
    if (!Number.isInteger(buildingId)) {
      buildingId = null;
    }
    this.buildingSelected.setValue(buildingId);
  }

}
