import {Pipe, PipeTransform} from '@angular/core';

/**
 * 根据ID计算出年龄
 */
@Pipe({
  name: 'idAge'
})
export class IdAgePipe implements PipeTransform {

  transform(input: string, ...args: unknown[]): number {
    if (!input || input.length !== 18) {
      return null;
    }
    //身份证
    const year = parseInt(input.slice(6, 10)); //parseInt将字符串转成数字
    const month = parseInt(input.slice(10, 12));
    const day = parseInt(input.slice(12, 14));
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
