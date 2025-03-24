import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {ActivatedRoute} from '@angular/router'
import {CommonService} from '../../../../../projects/lib/src/service/common.service'
import {WelfareJobService} from '../../../../../projects/lib/src/service/welfare-job.service'
import {Assert} from '@yunzhi/utils'
import {WelfareJobPostType} from '../../../../../projects/lib/src/entity/enum/welfareJob-postType'
import {WelfareJob} from '../../../../../projects/lib/src/entity/welfare-job'
import {YzValidators} from '../../../../../projects/lib/src/validator/yz-validators'


/**
 * 就业服务-公益性岗位管理-编辑
 * 原型：#1136
 * 功能：#1247
 */
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
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
  welfareJob: WelfareJob;

  constructor(private welfareJobService: WelfareJobService,
              private route: ActivatedRoute,
              private commonService: CommonService) { }

  ngOnInit(): void {
    this.formGroup.addControl(this.formKeys.name, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.sex, new FormControl(null, Validators.required));
    this.formGroup.addControl(this.formKeys.birthday, new FormControl(null, Validators.required));
    this.formGroup.addControl(this.formKeys.age, new FormControl(null));
    this.formGroup.addControl(this.formKeys.phone, new FormControl('', [Validators.required, YzValidators.isChinaMobileNumber]));
    this.formGroup.addControl(this.formKeys.workPlace, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.post, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.postType, new FormControl(null));

    // 获取id并找出对应welfareJob
    this.route.params.subscribe(param => {
      const id = +param.id;
      Assert.isNumber(id, 'id must be number');
      this.loadById(+id);
    });
    return ;
  }

  /**
   * 由后台加载预编辑的公益性岗位
   * @param id
   */
  loadById(id: number): void {
    this.welfareJobService.getById(id)
      .subscribe((welfareJob) => {
        Assert.isNotNullOrUndefined(welfareJob, welfareJob.name, welfareJob.birthday, welfareJob.sex,
          welfareJob.phone, welfareJob.workPlace, welfareJob.post, welfareJob.postType, 'some properties must be passed');
        this.welfareJob = welfareJob;
        this.formGroup.get('name').setValue(welfareJob.name);
        this.formGroup.get('birthday').setValue(welfareJob.birthday);
        this.formGroup.get('sex').setValue(+welfareJob.sex);
        this.formGroup.get('phone').setValue(welfareJob.phone);
        this.formGroup.get('workPlace').setValue(welfareJob.workPlace);
        this.formGroup.get('post').setValue(welfareJob.post);
        this.formGroup.get('postType').setValue(welfareJob.postType);
      }, error => console.log(error))
  }

  /**
   * 提交修改信息，保存
   */
  onSubmit(formGroup: FormGroup): void {
    const id = this.welfareJob.id;
    const newWelfareJob = new WelfareJob({
      name: formGroup.get(this.formKeys.name).value as string,
      birthday: formGroup.get(this.formKeys.birthday).value as number,
      sex: formGroup.get(this.formKeys.sex).value as boolean,
      workPlace: formGroup.get(this.formKeys.workPlace).value as string,
      phone: formGroup.get(this.formKeys.phone).value as string,
      post: formGroup.get(this.formKeys.post).value as string,
      postType: formGroup.get(this.formKeys.postType).value as WelfareJobPostType
    });
    this.welfareJobService.update( id, newWelfareJob ).subscribe(() => {
      }, () => {
      }, () => {
        this.commonService.success(() => {
          this.commonService.back()
        });
      });
  }
}
