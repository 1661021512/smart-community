import {Component, EventEmitter, forwardRef, OnInit, Output} from '@angular/core';
import {WebUserService} from '../../../../service/web-user.service';
import {RoleService} from '../../../../../projects/lib/src/service/role.service';
import {combineLatest} from 'rxjs';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {User} from '../../../../../projects/lib/src/entity/user';
import {Role} from '../../../../../projects/lib/src/entity/role';
import {Assert} from '@yunzhi/utils';

/** 角色多选
 * #391
 * @author 李国稳
 */
@Component({
  selector: 'app-role-checkbox',
  templateUrl: './role-checkbox.component.html',
  styleUrls: ['./role-checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => RoleCheckboxComponent)
    }
  ]
})

export class RoleCheckboxComponent implements OnInit, ControlValueAccessor {
  @Output()
  doChange = new EventEmitter<number[]>();
  //选择的身份id
  formControl = new FormControl([] as number[]);
  state = {
    list: [] as { id: number, name: string }[]
  }

  constructor(private userService: WebUserService,
              private roleService: RoleService) {
  }

  get list(): { id: number, name: string }[] {
    return this.state.list;
  }

  getDefaultChecked(value: number): boolean {
    return this.formControl.value.includes(value);
  }

  /**
   * 获取当前用户可选择的角色
   */
  getRoles(): void {
    combineLatest([this.roleService.getAll(), this.userService.currentLoginUser$])
      .subscribe((data) => {
        //user 当前登录用户  roles 所有角色 minWeight最小权重
        const user = data[1] as User;
        const roles = data[0] as Role[];
        let minWeight = Number.MAX_SAFE_INTEGER;
        //获取权重最小
        user.roles.forEach(function (role) {
          if (role.weight <= minWeight) {
            minWeight = role.weight
          }
        })
        //排除身份权重小于最小权重的角色
        this.state.list = roles.filter(value => value.weight >= minWeight);
      });
  }

  ngOnInit(): void {
    this.getRoles();
  }

  onChange(value: number, checked: boolean): void {
    const values = this.formControl.value as number[];
    const index = values.indexOf(value);
    if (checked && (index === -1)) {
      values.push(value);
    } else if (!checked && (index !== -1)) {
      values.splice(index, 1);
    }
    this.doChange.emit(values);
    this.formControl.setValue([...values]);
  }

  registerOnChange(fn: any): void {
    this.formControl.valueChanges.subscribe(data => fn(data));
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.formControl.disable() : this.formControl.enable();
  }

  writeValue(obj: number[]): void {
    Assert.isArray(obj, '角色选择组件请保证传入数组');
    this.formControl.setValue(obj);
  }

}
