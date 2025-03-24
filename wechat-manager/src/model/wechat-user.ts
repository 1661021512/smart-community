import {User} from '../entity/user';

/**
 * 微信用户
 */
export class WechatUser {
  openid: string;
  registered: boolean;
  user: User;
  
  constructor(data = {} as {
    openid: string, registered: boolean, user: User
  }) {
    this.openid = data.openid;
    this.registered = data.registered;
    if (data.user instanceof User) {
      this.user = data.user;
    } else {
      this.user = new User(data.user);
    }
  }
}
