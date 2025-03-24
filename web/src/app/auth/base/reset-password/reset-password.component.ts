import {Component, OnInit} from '@angular/core';
import {CommonService} from "../../../../../projects/lib/src/service/common.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {WebUserService} from "../../../../service/web-user.service";
import {HttpErrorResponse} from "@yunzhi/ng-common";
import {ActivatedRoute, Router} from "@angular/router";
import {BasicComponent} from "../basic.component";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  providers: [
    {
      provide: BasicComponent, multi: true,
      useClass: BasicComponent
    }
  ]
})
export class ResetPasswordComponent implements OnInit {

  formGroup = new FormGroup({});
  keys = {
    phone: 'phone',
    verificationCode: 'verificationCode'
  }

  constructor(private commonService: CommonService,
              private fb: FormBuilder,
              private userService: WebUserService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private authCompnent: BasicComponent
              ) {
  }

  ngOnInit(): void {
    this.formGroup.addControl(this.keys.phone, new FormControl('', Validators.required));
    this.formGroup.addControl(this.keys.verificationCode, new FormControl('', Validators.required));
  }

  onSubmit(): void {
    this.userService.resetPasswordByUsernameAndCode(
      {
        username: this.formGroup.get(this.keys.phone).value.toString(),
        verificationCode: this.formGroup.get(this.keys.verificationCode).value.toString()
      })
      .subscribe(param => {
        if (param !== null) {
          this.commonService.success(() => {}, '', '密码重置为' + param);
          this.authCompnent.mode = 'login';
          this.authCompnent.ngOnInit();
          this.router.navigateByUrl('/login');
        } else {
          this.commonService.error(() => {}, '', '验证码错误')
        }
      });
  }

  onVerification() {
    this.userService.isRequireValidationCode(this.formGroup.get(this.keys.phone).value);
    this.userService.sendVerificationCode(this.formGroup.get(this.keys.phone).value)
      .subscribe(() => {
      }, (response: HttpErrorResponse) => {
        console.log(response);
      });
    this.commonService.success(() => {
    }, '', '验证码已发送');
  }
}
