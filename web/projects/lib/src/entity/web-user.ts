import {User} from './user';
import {UserStatus} from './enum/user-status';
import {District} from './district';

/**
 * WEB 用户
 */
export interface WebUser {
  district: District;
  id: number;
  name: string;
  password: string;
  status: UserStatus;
  user: User;
  username: string;
}
