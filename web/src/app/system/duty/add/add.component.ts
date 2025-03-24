import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DistrictType} from "../../../../../projects/lib/src/entity/enum/district-type";
import {Duty} from "../../../../../projects/lib/src/entity/duty";
import {DutyService} from "../../../../../projects/lib/src/service/duty.service";
import {CommonService} from "../../../../../projects/lib/src/service/common.service";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
/**
 * author weiweiyi
 */
export class AddComponent implements OnInit {
  /**
   * 表单关键字
   */
  formKeys = {
    name: 'name',
    weight: 'weight',
    typeOfDistrict: 'typeOfDistrict'
  };

  /**
   * 显示 "请选择"
   */
  isShowPleaseSelect = true;

  /**
   * 初始化表单组
   */
  formGroup = new FormGroup({});
  constructor(private dutyService: DutyService,
              private commonService: CommonService) { }

  ngOnInit(): void {
    // 添加表单控制器进去
    this.formGroup.addControl(this.formKeys.name, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.weight, new FormControl(null, Validators.required));
    this.formGroup.addControl(this.formKeys.typeOfDistrict, new FormControl(null, Validators.required));
  }

  onSubmit(formGroup: FormGroup): void {
    const newPost = new Duty({
      name: this.formGroup.get(this.formKeys.name).value as string,
      weight: this.formGroup.get(this.formKeys.weight).value as number,
      typeOfDistrict: this.formGroup.get(this.formKeys.typeOfDistrict).value as DistrictType,
    });

    // 调用M层方法传入新岗位信息对后台进行请求
    this.dutyService.save(newPost)
      .subscribe(() => this.commonService.success(
        () => {
          this.commonService.back();
        }
      ));
  }

}
