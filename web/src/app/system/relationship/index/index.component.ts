import { Component, OnInit } from '@angular/core';
import {Page} from "@yunzhi/ng-common";
import {CommonService} from "../../../../../projects/lib/src/service/common.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Relationship} from "../../../../../projects/lib/src/entity/relationship";
import { RelationshipService } from 'projects/lib/src/service/relationship.service';
import {getDefaultWhenValueIsInValid} from "@yunzhi/utils";
import {config} from "../../../../conf/app.config";
import {Assert} from "@yunzhi/ng-mock-api";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  // 定义一个Page<Relationship>类型的变量pageData
  pageData = {} as Page<Relationship>;

  /**查询参数*/
  queryParams = {} as QueryParams;

  formGroup = new FormGroup({});

  /**
   * 表单关键字
   */
  formKeys = {
    name: 'name'
  };

  // 构造函数，定义私有变量并声明类型
  constructor(
    private relationshipService: RelationshipService,
    private commonService: CommonService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  // 初始化函数，类型为void，继承OnInit就必须有此函数，且必须有函数体
  ngOnInit(): void {
    // 使用this.keys初始化FormControl，从而避免拼写错误
    this.formGroup.addControl(this.formKeys.name, new FormControl('', Validators.required));

    this.route.queryParams.subscribe((params: { page?: string, size?: string }) => {
      this.queryParams = {...params};

      const page = +getDefaultWhenValueIsInValid(params.page, '0');
      const size = +getDefaultWhenValueIsInValid(params.size, config.size.toString());
      const name = params[this.formKeys.name];
      this.relationshipService.page({page, size, name})
        .subscribe(page => {
          this.validate(page);
          this.pageData = page;
        })
    })
  }

  /**
   * 数据校验
   * @param page 分页
   */
  private validate(page: Page<Relationship>) {
    page.content.forEach(relationship => {
      Assert.isNotNullOrUndefined(
        relationship.id,
        relationship.name,
        relationship.weight,
        '校验中继器错误'
      );
    })
  }

  /**
   * 点击分页
   * @param page 当前页
   */
  onPageChange(page: number): void {
    this.reload({page: page.toString()});
  }

  /**
   * 点击改变每页大小
   * @param size 每页大小
   */
  onSizeChange(size: number): void {
    this.reload({size: size.toString()});
  }

  onSubmit(queryForm: FormGroup): void {
    this.reload({...this.queryParams, ...queryForm.value});
  }

  /**
   * 查询
   * @param queryParams 查询参数
   */
  reload(queryParams: QueryParams): void {
    // 将queryParams与this.queryParams合并，如果数据项有冲突，则取queryParams的
    this.queryParams = {...this.queryParams, ...queryParams};
    this.router.navigate(['./'],
      {
        relativeTo: this.route,
        queryParams: this.queryParams
      }).then();
  }

  /**
   * 删除
   */
  onDelete(index: number, relationshipId: number): void {
    this.commonService.confirm((confirm) => {
      if(confirm) {
        this.relationshipService.delete(relationshipId)
          .subscribe(() => {
            this.commonService.success();
            this.pageData.content.splice(index, 1);
          });
      }
    });
  }

}

type QueryParams = {
  page?: string,
  size?: string
}
