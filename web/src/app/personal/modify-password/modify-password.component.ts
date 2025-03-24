import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {WebUserService} from "../../../service/web-user.service";
import {CommonService} from "../../../../projects/lib/src/service/common.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-modify-password',
  templateUrl: './modify-password.component.html',
  styleUrls: ['./modify-password.component.scss']
})
export class ModifyPasswordComponent implements OnInit {

  modifyPasswordForm: FormGroup;
  submitting = false;

  constructor(private fb: FormBuilder,
              private userService: WebUserService,
              private commonService: CommonService,
              private router: Router) { }

  ngOnInit(): void {
    this.modifyPasswordForm = this.fb.group({
      oldPassword: [null, {
        validators: [Validators.required],
        asyncValidators: [this.userService.oldPasswordValidator()],
        updateOn: 'blur'
      }],
      newPassword:[null, [Validators.required, Validators.minLength(5)]],
      confirmNewPassword:  [null, Validators.required]
    }, {validators: this.userService.confirmPasswordValidator},
    );
  }

  submit(): void {
    this.submitting = true;
    this.userService.updatePassword(this.modifyPasswordForm.get('newPassword').value,
      this.modifyPasswordForm.get('oldPassword').value)
      .subscribe(() => {
        this.userService.logout()
          .subscribe(() => {
            }, () => {
            }, () => {
              this.commonService.success(() => {
                this.router.navigateByUrl('login').then();
              });
            });
      });
  }
}
