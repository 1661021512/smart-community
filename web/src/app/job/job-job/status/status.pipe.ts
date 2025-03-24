import {Pipe, PipeTransform} from '@angular/core';
import {Utils} from '@yunzhi/utils';

/**
 * 状态管道
 */
@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    if (!value) {
      return '';
    }
    const endDate = Utils.intDateToTimestamp(value);
    const now = new Date();
    return endDate > now.getTime() ? '发布中' : '已结束';
  }
}
