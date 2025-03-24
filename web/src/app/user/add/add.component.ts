import {Component, OnInit} from '@angular/core';
import {CommonService} from '../../../../projects/lib/src/service/common.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {WebUserService} from '../../../service/web-user.service';
import {User} from '../../../../projects/lib/src/entity/user';
import {YzValidators} from '../../../../projects/lib/src/validator/yz-validators';
import {District} from '../../../../projects/lib/src/entity/district';
import {Role} from '../../../../projects/lib/src/entity/role';
import {YzAsyncValidators} from '../../../../projects/lib/src/validator/yz-async-validators';
import {DISTRICT_TYPE} from '../../../../projects/lib/src/entity/enum/district-type';

/**
 * 用户管理新增
 */
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  districtCommunityType = DISTRICT_TYPE.community.value;
  /**
   * 新增用户数据项
   */
  formGroup = new FormGroup({});
  /**
   * 表单关键字
   */
  keys = {
    name: 'name',
    username: 'username',
    districtId: 'districtId',
    roles: 'roles',
  };
  villageId = null as number;

  constructor(private commonService: CommonService,
              private userService: WebUserService,
              private yzAsyncValidators: YzAsyncValidators) {
  }

  ngOnInit(): void {
    this.formGroup.addControl(this.keys.name,
      new FormControl('', Validators.required));
    this.formGroup.addControl(this.keys.username,
      new FormControl('', Validators.required,this.yzAsyncValidators.usernameNotExist()));
    this.formGroup.addControl(this.keys.roles,
      new FormControl([] as number[], [Validators.required, YzValidators.arrayMinLength(1)]));
    const regionControl = new FormControl(null, Validators.required);
    this.formGroup.addControl(this.keys.districtId, regionControl);
  }

  /**
   * 保存提交功能
   * @param formGroup 待保存的数据
   */
  onSubmit(formGroup: FormGroup): void {
    const districtId = formGroup.get(this.keys.districtId).value as number;
    // 通过formGroup数据构造新用户

    const user = new User({
        name: formGroup.get(this.keys.name).value,
        username: formGroup.get(this.keys.username).value,
        roles: (formGroup.get(this.keys.roles).value as number[]).map(id => {
          return {id} as Role
        }),
        district: {
          id: districtId
        } as District
      }
    );

    // 调用M层方法传入新用户对后台进行请求
    this.userService.save(user)
      .subscribe(() => {
        // 数据保存成功，调用commonService的成功提示并进行返回跳转
        this.commonService.success(() => {
          this.commonService.back();
        });
      });
  }
}
