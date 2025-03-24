import {Component, forwardRef, Input} from '@angular/core';
import {House} from '../../../../projects/lib/src/entity/house';
import {HouseService} from '../../../../projects/lib/src/service/house.service';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Assert} from '@yunzhi/utils';
import {Select2} from '../../share/select2/select2';

/**
 * 房子选择
 * @author panjie
 */
@Component({
  selector: 'app-house-select',
  templateUrl: './house-select.component.html',
  styleUrls: ['./house-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => HouseSelectComponent)
    }
  ]
})
export class HouseSelectComponent implements ControlValueAccessor {
  formControl = new FormControl();
  /**所有的房子*/
  houses = [] as Select2<number, any>[];

  constructor(private houseService: HouseService) {
  }

  @Input()
  set buildingId(buildingId: number) {
    if (!Number.isInteger(buildingId)) {
      this.formControl.setValue(null);
      this.houses = [];
      return;
    }

    this.houseService.getAllByBuildingId(buildingId)
      .subscribe(houses => {
        this.setHouses(houses);
      });
  }

  registerOnChange(fn: (data: number) => void): void {
    this.formControl.valueChanges.subscribe(data => fn(data));
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(obj: number): void {
    this.formControl.setValue(obj);
  }

  /**
   * 设置校验房子
   * @param houses 所有的房子
   */
  setHouses(houses: House[]) {
    houses.forEach(house => {
      Assert.isDefined(house.id, house.name, house.unit, 'house属性未满足组件条件');
      Assert.isDefined(house.unit.name, 'unit属性未满足组件条件');
    });
    this.houses = houses.map(house => new Select2<number, any>({
        id: house.id,
        label: house.unit.name + (house.unit.name == '' ? '' : '-') + house.name,
        option: house.unit.name + (house.unit.name == '' ? '' : '-') + house.name,
        searchFn: function (searchKey: string) {
          const name = house.unit.name + house.name;
          return name.includes(searchKey);
        }
      }
    ));
  }
}
