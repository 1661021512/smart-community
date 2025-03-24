import {Component, Input} from '@angular/core';
import {Assert} from '@yunzhi/utils';
import {WebUserService} from "../../../service/web-user.service";
import {User} from "../../../../projects/lib/src/entity/user";

@Component({
  selector: 'app-user-phone-show',
  templateUrl: './phone-show.component.html',
  styleUrls: ['./phone-show.component.scss']
})
export class PhoneShowComponent {
  @Input()
  user: User;

  constructor(private userService: WebUserService) {
  }

  /**
   * 获取user手机号
   */
  getPhone(user: User): void {
    Assert.isNotNullOrUndefined(user,'user不能为空');
    this.userService.getById(user.id)
      .subscribe(value => {
        Assert.isString(value.username, 'username must be string');
        user.username = value.username;
      });
  }
}
