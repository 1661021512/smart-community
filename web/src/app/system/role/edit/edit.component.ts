import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {CommonService} from "../../../../../projects/lib/src/service/common.service";
import {RoleService} from "../../../../../projects/lib/src/service/role.service";
import {Assert} from "@yunzhi/utils";
import {Role} from "../../../../../projects/lib/src/entity/role";

/**
 * 角色管理编辑 @Author duangshuangyu
 */
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  formGroup = new FormGroup({
    id: new FormControl('', Validators.required)
  });
  formKeys = {
    name: 'name',
    weight: 'weight',
    value: 'value'
  };

  constructor(private roleService: RoleService,
              private route: ActivatedRoute,
              private commonService: CommonService) {
  }

  /**
   * 由后台加载预编辑的角色
   * @param id
   */
  loadById(id: number): void {
    this.formGroup.get('id')?.setValue(id);
    this.roleService.getById(id)
      .subscribe((role) => {
        Assert.isNotNullOrUndefined(role, 'role validate error');
        Assert.isNotNullOrUndefined(role.name, role.weight, 'some properties must be passed');

        this.formGroup.get(this.formKeys.name).setValue(role.name);
        this.formGroup.get(this.formKeys.weight).setValue(role.weight);
        this.formGroup.get(this.formKeys.value).setValue(role.value);
      }, error => console.log(error))
  }

  ngOnInit(): void {
    this.formGroup.addControl(this.formKeys.name, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.weight, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.value, new FormControl('', Validators.required));

    // 获取id并找出对应role
    this.route.params.subscribe(param => {
      const id = +param.id;
      Assert.isNumber(id, 'id must be number');
      this.loadById(id);
    });
  }

  onSubmit(formGroup: FormGroup): void {
    const id = formGroup.get('id').value;
    const newRole = new Role({
      name: formGroup.get(this.formKeys.name).value,
      weight: formGroup.get(this.formKeys.weight).value,
      value: formGroup.get(this.formKeys.value).value as string
    });

    this.roleService.update(id, newRole)
      .subscribe(() => this.commonService.success(
        () => {
          this.commonService.back();
        }
      ));
  }
}
