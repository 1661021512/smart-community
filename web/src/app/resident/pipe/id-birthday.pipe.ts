import {Pipe, PipeTransform} from '@angular/core';

/**
 * 根据ID计算出生日期的时间戳
 */
@Pipe({
  name: 'idBirthday'
})
export class IdBirthdayPipe implements PipeTransform {

  transform(input: string, ...args: unknown[]): number {
    if (!input || input.length !== 18) {
      return null;
    }
    const birthday = new Date(
      parseInt(input.substring(6, 10)),
      parseInt(input.substring(10, 12)) - 1,
      parseInt(input.substring(12, 14)));
    return birthday.getTime();
  }

}
