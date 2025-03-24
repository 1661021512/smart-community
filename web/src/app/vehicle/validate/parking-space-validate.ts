import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

/**
 * 车辆管理所用的跨字段验证器
 * 停车位号码校验器
 * 若输入停车位号码字段则必须输入停车位类型
 * @param control
 */

export const paringSpaceValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const parkingSpaceNumber = control.get('parkingSpaceNumber').value;
  const parkingSpaceType = control.get('parkingSpaceType').value;
  // 停车位号码有值 则停车位类型必须有值
  return (parkingSpaceNumber && parkingSpaceType !== null) || (!parkingSpaceNumber)  ? null : { paringSpace: true };
};
