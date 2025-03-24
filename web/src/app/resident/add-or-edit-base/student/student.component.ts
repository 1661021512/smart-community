import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {Resident} from '../../../../../projects/lib/src/entity/resident';
import {Assert} from '@yunzhi/utils';
import {ResidentAddComponent} from '../../resident-add/resident-add.component';
import {Subscription} from 'rxjs';

/**
 * 在校生
 */
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit, OnDestroy {
  @Input()
  formGroup: FormGroup;
  formKeys = ResidentAddComponent.keys;
  @Input()
  resident: Resident;
  subscriptions = [] as Subscription[];
  constructor() {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(value => value.unsubscribe());
  }

  ngOnInit(): void {
    Assert.isDefined(this.resident, '未传入居民信息');
    this.subscriptions.push(
      this.formGroup.valueChanges.subscribe(() => {
        this.resident.beStudent = this.formGroup.get(this.formKeys.beStudent).value;
        this.resident.school = this.formGroup.get(this.formKeys.school).value;
        this.resident.schoolAddress = this.formGroup.get(this.formKeys.schoolAddress).value;
      }));

    this.initDynamicValidators();
  }

  /**
   * 重新设置验证器
   * @param addValidator 是否添加验证器
   */
  resetValidators(addValidator: boolean) {
    const control = this.formGroup.get(this.formKeys.school);
    control.clearValidators();
    if (addValidator) {
      control.setValidators(Validators.required);
    }
    control.updateValueAndValidity();
  }

  /**
   * 初始化动态验证器
   * 有慢性病的话，加入慢性病详情描述验证器
   */
  initDynamicValidators() {
    const beStudentControl = this.formGroup.get(this.formKeys.beStudent);
    this.resetValidators(beStudentControl.value);
    this.subscriptions.push(
      beStudentControl.valueChanges.subscribe(value => {
        this.resetValidators(value);
      }));
  }
}
