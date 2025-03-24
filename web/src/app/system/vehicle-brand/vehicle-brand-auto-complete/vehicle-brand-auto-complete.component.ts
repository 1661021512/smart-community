import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from "@angular/forms";
import {VehicleBrandService} from "../../../../../projects/lib/src/service/vehicle-brand.service";
import {VehicleBrand} from "../../../../../projects/lib/src/entity/vehicle-brand";
import {Observable} from "rxjs";

/**
 * 车辆品牌自动完成组件，使用时请参考 web/src/app/system/vehicle-brand/vehicle-brand-auto-complete-demo
 */
@Component({
  selector: 'app-vehicle-brand-auto-complete',
  templateUrl: './vehicle-brand-auto-complete.component.html',
  styleUrls: ['./vehicle-brand-auto-complete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => {
        return VehicleBrandAutoCompleteComponent;
      })
    }
  ]
})
export class VehicleBrandAutoCompleteComponent implements OnInit, ControlValueAccessor {
  @Output()
  doSearchKeyChange = new EventEmitter<string>();

  formControl = new FormControl(null);

  items = [] as { id: number, name: string }[];


  constructor(private vehicleBrandService: VehicleBrandService) {
  }

  writeValue(obj: any): void {
    this.formControl.setValue(obj);
  }

  registerOnChange(fn: any): void {
    this.formControl.valueChanges
      .subscribe((data: VehicleBrand) => {
        fn(data);
      })
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState?(isDisabled: boolean): void {
  }

  ngOnInit(): void {
    this.formControl.setValue({id: null});}

  /**
   * 当输入的值变更时，请求后台返回数据
   * @param searchKey 输入值
   */
  onSearchKeyChange(searchKey: string) {
    this.items = [];
    this.vehicleBrandService.page(0, 20, {name: searchKey})
      .subscribe(value => {
        this.items = value.content.map(v => {
          return {id: v.id, name: v.name} as VehicleBrand;
        })
      })
  }
}
