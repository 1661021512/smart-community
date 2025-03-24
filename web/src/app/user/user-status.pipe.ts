import { Pipe, PipeTransform } from '@angular/core';
import { StatusEnum } from 'projects/lib/src/entity/enum/statusEnum';
import {UserStatus, USER_STATUS } from 'projects/lib/src/entity/enum/user-status';

@Pipe({
  name: 'UserStatus'
})
export class UserStatusPipe implements PipeTransform {
  transform(status: UserStatus, ...args: unknown[]): unknown {
    for (let key in USER_STATUS) {
      const value = USER_STATUS[key] as StatusEnum<UserStatus>;
      if (value.value === status) {
        return value.description;
      }
    }
    console.error(`未找到值为${status}的用户状态`);
    return '-';
  }
}
