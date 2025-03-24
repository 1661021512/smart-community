import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {WelfareJobService} from '../../../../../projects/lib/src/service/welfare-job.service';
import {CommonService} from '../../../../../projects/lib/src/service/common.service';
import {YzValidators} from '../../../../../projects/lib/src/validator/yz-validators';
import {WelfareJob} from '../../../../../projects/lib/src/entity/welfare-job';
import {WelfareJobPostType} from '../../../../../projects/lib/src/entity/enum/welfareJob-postType';

/**
 ** 就业服务-公益性岗位管理-新增
 */

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  /**
   * 初始化表单组
   */
  formGroup = new FormGroup({});
  /**
   * 表单关键字
   */
  formKeys = {
    name: 'name',
    sex: 'sex',
    birthday: 'birthday',
    age: 'age',
    phone: 'phone',
    workPlace: 'workPlace',
    post: 'post',
    postType: 'postType'
  };

  constructor(
    private welfareJobService: WelfareJobService,
    private commonService: CommonService
  ) {
  }

  ngOnInit(): void {
    this.formGroup.addControl(this.formKeys.name, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.sex, new FormControl(null, Validators.required));
    this.formGroup.addControl(this.formKeys.birthday, new FormControl(null, Validators.required));
    this.formGroup.addControl(this.formKeys.age, new FormControl(null));
    this.formGroup.addControl(this.formKeys.phone, new FormControl('', [Validators.required, YzValidators.isChinaMobileNumber]));
    this.formGroup.addControl(this.formKeys.workPlace, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.post, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.postType, new FormControl(null));
  }

  onSubmit(formGroup: FormGroup): void {
    const newWelfareJob = new WelfareJob({
      name: formGroup.get(this.formKeys.name).value as string,
      birthday: formGroup.get(this.formKeys.birthday).value as number,
      sex: formGroup.get(this.formKeys.sex).value as boolean,
      workPlace: formGroup.get(this.formKeys.workPlace).value as string,
      phone: formGroup.get(this.formKeys.phone).value as string,
      post: formGroup.get(this.formKeys.post).value as string,
      postType: formGroup.get(this.formKeys.postType).value as WelfareJobPostType
    });

    this.welfareJobService.save(newWelfareJob).subscribe(() => {
      this.commonService.success(() => this.commonService.back());
    }, error => console.log('保存失败', error));
  }
}
