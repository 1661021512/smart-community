import { Pipe, PipeTransform } from '@angular/core';

/**
 * 根据 出生日期birthday 计算出年龄
 */
@Pipe({
  name: 'birthdayAge'
})
export class BirthdayAgePipe implements PipeTransform {

  transform(birthday: number, ...args: unknown[]): number {
    //根据输入的出生日期计算出生年份和月份
    const birthdayTime = new Date(birthday);
    const year = birthdayTime.getFullYear();
    const month = birthdayTime.getMonth();
    const day = birthdayTime.getDay();
    //当前时间
    const nowDateTime = new Date();
    const nowYear = nowDateTime.getFullYear(); //getFullYear()，年份
    const nowMonth = nowDateTime.getMonth(); //getMonth从0获取的,月份
    const nowDay = nowDateTime.getDate(); //getDate()日期
    //计算年龄
    let age = nowYear - year;
    if (month > nowMonth + 1) {
      age = age - 1;
    } else if (month == nowMonth + 1 && day >= nowDay) {
      age = age - 1;
    }
    return age;
  }

}
