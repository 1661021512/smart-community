import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CommonService} from "../../../../../projects/lib/src/service/common.service";
import {Duty} from "../../../../../projects/lib/src/entity/duty";
import {DutyService} from "../../../../../projects/lib/src/service/duty.service";
import {Assert} from "@yunzhi/utils";
import {ActivatedRoute} from "@angular/router";
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
/**
 * author weiweiyi
 */
export class EditComponent implements OnInit {
  /**
   * 表单关键字
   */
  formKeys = {
    name: 'name',
    weight: 'weight',
    typeOfDistrict: 'typeOfDistrict'
  };

  /**
   * 初始化表单组
   */
  formGroup = new FormGroup({
    id: new FormControl('', Validators.required)
  });
  constructor(private dutyService: DutyService,
              private route: ActivatedRoute,
              private commonService: CommonService) { }

  ngOnInit(): void {
    // 添加表单控制器进去
    this.formGroup.addControl(this.formKeys.name, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.weight, new FormControl(null, Validators.required));
    this.formGroup.addControl(this.formKeys.typeOfDistrict, new FormControl(null, Validators.required));
    // 获取id并找出对应post
    this.route.params.subscribe(param => {
      const id = +param.id;
      Assert.isNumber(id, 'id must be number');
      this.loadById(id);
    });
  }
  /**
   * 由后台加载预编辑的居民关系
   * @param id
   */
  loadById(id: number): void {
    this.formGroup.get('id').setValue(id);
    this.dutyService.getById(id)
      .subscribe((post) => {
        Assert.isNotNullOrUndefined(post, 'duty validate error');
        Assert.isNotNullOrUndefined(post.name, post.weight,post.typeOfDistrict, 'some properties must be passed');
        this.formGroup.get(this.formKeys.name).setValue(post.name);
        this.formGroup.get(this.formKeys.weight).setValue(post.weight);
        this.formGroup.get(this.formKeys.typeOfDistrict).setValue(post.typeOfDistrict);
      }, error => console.log(error))
  }

  onSubmit(formGroup: FormGroup): void {
    const id = this.formGroup.get('id').value;
    const newPost = new Duty({
      name: this.formGroup.get(this.formKeys.name).value,
      weight: this.formGroup.get(this.formKeys.weight).value,
      typeOfDistrict: this.formGroup.get(this.formKeys.typeOfDistrict).value
    });

    this.dutyService.update(id, newPost)
      .subscribe(() => this.commonService.success(
        () => {
          this.commonService.back();
        }
      ));
  }

}
