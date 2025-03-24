import {Injectable} from '@angular/core';
import {VehicleBrandService} from "../../../../../projects/lib/src/service/vehicle-brand.service";
import {AbstractControl, AsyncValidatorFn, ValidationErrors} from "@angular/forms";
import {Observable, of} from "rxjs";
import {debounceTime, distinctUntilChanged, first, map, switchMap} from "rxjs/operators";

/**
 * 异步验证器.
 */
@Injectable({
  providedIn: 'root'
})
export class VehicleBrandAsyncValidator {

  constructor(private vehicleBrandService: VehicleBrandService) { }

  /**
   * 验证方法，车辆品牌名称
   */
  vehicleBrandNameNotExist(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (control.value === '') {
        return of(null);
      }
      return control.valueChanges.pipe(
        // 防抖时间，单位毫秒
        debounceTime(1000),
        // 过滤掉重复的元素
        distinctUntilChanged(),
        // 调用服务, 获取结果
        switchMap(value => this.vehicleBrandService.existByName(value)),
        // 对结果进行处理，null表示正确，对象表示错误
        map((exists: boolean) => (exists ? {vehicleBrandNameExist: true} : null)),
        // 每次验证的结果是唯一的，截断流
        first()
      )
    };
  }
}
