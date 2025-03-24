import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CommonService} from "../../../../../projects/lib/src/service/common.service";
import {RoleService} from "../../../../../projects/lib/src/service/role.service";
import {Role} from "../../../../../projects/lib/src/entity/role";

/**
 * 角色管理添加
 */
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  /**
   * 表单关键字
   */
  formKeys = {
    name: 'name',
    weight: 'weight',
    systemed: 'systemed',
    value: 'value',
  };
  /**
   * 初始化表单组
   */
  formGroup = new FormGroup({});
  constructor(private roleService: RoleService,
              private commonService: CommonService) {
  }

  ngOnInit(): void {
    // 添加表单控制器进去
    this.formGroup.addControl(this.formKeys.name, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.weight, new FormControl(null, Validators.required));
    this.formGroup.addControl(this.formKeys.systemed, new FormControl(false, Validators.required));
    this.formGroup.addControl(this.formKeys.value, new FormControl('', Validators.required));
  }

  onSubmit(formGroup: FormGroup): void {
    console.log(formGroup.value);
    const newRole = new Role({
      name: this.formGroup.get(this.formKeys.name).value as string,
      weight: this.formGroup.get(this.formKeys.weight).value as number,
      systemed: this.formGroup.get(this.formKeys.systemed).value as boolean,
      value: this.formGroup.get(this.formKeys.value).value as string,
    });

    // 调用M层方法传入新居民关系信息对后台进行请求
    this.roleService.save(newRole)
      .subscribe(() => this.commonService.success(
        () => {
          this.commonService.back();
        }
      ));
  }
}
