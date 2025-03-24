import {Pipe, PipeTransform} from '@angular/core';
import {Activity_Status} from 'projects/lib/src/entity/enum/activity-status';
import {Utils} from '@yunzhi/utils';

@Pipe({
  name: 'activityState'
})
export class ActivityStatePipe implements PipeTransform {
  transform(value: number, ...args: any[]): string {
    const now = new Date().getTime();
    const date = Utils.intDateToTimestamp(value);
    if (now > date) {
      return Activity_Status.end.description;
    } else {
      return Activity_Status.handing.description;
    }
  }
}
