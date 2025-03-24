import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

/**
 * 跨字段交叉验证器
 * 同时验证接种疫苗和 地点 原因 三个字段
 * 如果接种，地点必填，只有填写地点才能验证通过，返回null
 * 未接种，地点不必填，直接返回null
 * @param control 需要验证的 formGroup
 */
export const VaccinatedValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const beVaccinated = control.get('beVaccinated');
  const vaccinatedPlace = control.get('vaccinatedPlace');
  const notVaccinatedReason = control.get('notVaccinatedReason');
  // 判断是否传值
  if (beVaccinated === null || vaccinatedPlace === null || notVaccinatedReason === null) {
    return {vaccinated: true};
  }
  return (beVaccinated.value as boolean && vaccinatedPlace.value as string) || !beVaccinated.value as boolean ? null : {vaccinated: true};
};

