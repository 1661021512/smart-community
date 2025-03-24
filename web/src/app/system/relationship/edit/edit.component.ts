import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RelationshipService} from "../../../../../projects/lib/src/service/relationship.service";
import {ActivatedRoute} from "@angular/router";
import {Relationship} from "../../../../../projects/lib/src/entity/relationship";
import {Assert} from "@yunzhi/utils";
import {CommonService} from "../../../../../projects/lib/src/service/common.service";

/**
 * 居民关系编辑
 */
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  formKeys = {
    name: 'name',
    weight: 'weight'
  };

  // 初始化表单组
  formGroup = new FormGroup({
    id: new FormControl('', Validators.required)
  });

  constructor(private relationshipService: RelationshipService,
              private route: ActivatedRoute,
              private commonService: CommonService) {

  }

  ngOnInit(): void {

    this.formGroup.addControl(this.formKeys.name, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.weight, new FormControl(null, Validators.required));

    // 获取id并找出对应relationship
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
    console.log('执行loadById(id)');
    this.formGroup.get('id')?.setValue(id);
    this.relationshipService.getById(id)
      .subscribe((relationship) => {
        Assert.isNotNullOrUndefined(relationship, 'relationship validate error');
        Assert.isNotNullOrUndefined(relationship.name, relationship.weight, 'some properties must be passed');

        console.log('接收到了ID对应的Relationship', relationship);

        this.formGroup.get(this.formKeys.name).setValue(relationship.name);
        this.formGroup.get(this.formKeys.weight).setValue(relationship.weight);
      }, error => console.log(error))
  }

  onSubmit(formGroup: FormGroup): void {
    const id = this.formGroup.get('id').value;
    const newRelationship = new Relationship({
      name: this.formGroup.get(this.formKeys.name).value,
      weight: this.formGroup.get(this.formKeys.weight).value
    });

    console.log('c层提交');
    this.relationshipService.update(id, newRelationship)
      .subscribe(() => this.commonService.success(
        () => {
          this.commonService.back();
        }
      ));
  }
}
