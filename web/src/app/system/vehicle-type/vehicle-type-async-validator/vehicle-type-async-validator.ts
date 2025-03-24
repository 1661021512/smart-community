import {Injectable} from '@angular/core';
import {AbstractControl, AsyncValidatorFn, ValidationErrors} from "@angular/forms";
import {Observable, of} from "rxjs";
import {debounceTime, distinctUntilChanged, first, map, switchMap} from "rxjs/operators";
import {VehicleTypeService} from '../../../../../projects/lib/src/service/vehicle-type.service';

/**
 * 异步验证器.
 */
@Injectable({
  providedIn: 'root'
})
export class VehicleTypeAsyncValidator {

  constructor(private vehicleTypeService: VehicleTypeService) { }

  /**
   * 验证方法，车辆类型名称
   * id为可选参数，详细查看vehicleTypeService.nameIsAvailable注解
   */
  vehicleTypeNameIsAvailable(VehicleTypeId?: number): AsyncValidatorFn {
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
        switchMap(value  => this.vehicleTypeService.nameIsAvailable(value, VehicleTypeId)),
        // 对结果进行处理，null表示正确，对象表示错误
        map((available: boolean) => (available ? null : {vehicleTypeNameNotAvailable: true})),
        // 每次验证的结果是唯一的，截断流
        first()
      )
    };
  }
}
