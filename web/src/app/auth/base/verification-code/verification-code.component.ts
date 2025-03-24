import {Component, EventEmitter, Input, Output} from '@angular/core';
import {WebUserService} from "../../../../service/web-user.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-verification-code',
  templateUrl: './verification-code.component.html',
  styleUrls: ['./verification-code.component.scss']
})
export class VerificationCodeComponent {

  @Output()
  beError = new EventEmitter<string>();
  countDown = 0;
  /**正在倒计时*/
  countDowning = false;
  /** 验证码按钮提示信息*/
  validateCodeInfo = '发送验证码'

  constructor(private userService: WebUserService) { }

  _phone: string;

  get phone(): string {
    return this._phone;
  }

  @Input()
  set phone(phone: string) {
    this._phone = phone;
  }

  /**
   * 发送验证码
   */
  sendVerificationCode(): void {
    this.countDowning = true;

    // 初始化计数
    this.countDown = 60;

    //修改提示信息
    this.validateCodeInfo = this.countDown + '秒后重新获取';

    //定时器，间隔1s
    const handler = setInterval(() => {
      // 自减
      this.countDown--;
      this.validateCodeInfo = this.countDown + '秒后重新获取';

      // 如果减为0，重新启用按钮
      if (this.countDown === 0) {
        this.countDowning = false;
        this.validateCodeInfo = '获取验证码';

        // 清空定时器
        clearInterval(handler);
      }
    }, 1000, 60);

    this.userService.sendVerificationCode(this._phone)
      .subscribe(() => {
      }, (response: HttpErrorResponse) => {
        console.log(response);
        this.beError.emit(response.error.message);
      });
  }

  verificationCodeButtonDisabled(): boolean {
    return this.countDown > 0;
  }
}
