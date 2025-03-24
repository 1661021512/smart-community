import {User} from '../entity/user';
import {District} from '../entity/district';

/**
 * 用户
 */
export class UserModel {
  district: District;
  user: User;

  constructor(data = {} as { district: District, user: User }) {
    this.district = data.district;
    this.user = data.user;
  }
}
