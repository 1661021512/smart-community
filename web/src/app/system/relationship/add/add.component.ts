import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CommonService} from "../../../../../projects/lib/src/service/common.service";
import {RelationshipService} from "../../../../../projects/lib/src/service/relationship.service";
import {Relationship} from "../../../../../projects/lib/src/entity/relationship";
/**
 * 居民关系添加
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
    weight: 'weight'
  };
  /**
   * 初始化表单组
   */
  formGroup = new FormGroup({});
  constructor(private relationshipService: RelationshipService,
              private commonService: CommonService) {
  }

  ngOnInit(): void {
    // 添加两个表单控制器进去，分别控制V层名称及权重两个表单
    this.formGroup.addControl(this.formKeys.name, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.weight, new FormControl('', Validators.required));
  }

  onSubmit(formGroup: FormGroup): void {
    console.log(formGroup.value);
    const newRelationship = new Relationship({
      name: this.formGroup.get(this.formKeys.name).value as string,
      weight: this.formGroup.get(this.formKeys.weight).value as number
    });

    // 调用M层方法传入新居民关系信息对后台进行请求
    this.relationshipService.save(newRelationship)
      .subscribe(
        () => this.commonService.success(() => this.commonService.back()),
        error => console.log('保存失败', error));
  }
}
