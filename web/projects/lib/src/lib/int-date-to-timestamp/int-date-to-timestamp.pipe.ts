import { Pipe, PipeTransform } from '@angular/core';
import {Utils} from '@yunzhi/utils';

/**
 * int类型的日期转换为日间戳
 * input: 20120201
 * output: 1328025600000
 */
@Pipe({
  name: 'intDateToTimestamp'
})
export class IntDateToTimestampPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): number {
    return Utils.intDateToTimestamp(value);
  }

}
