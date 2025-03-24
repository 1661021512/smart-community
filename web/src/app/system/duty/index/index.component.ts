import { Component, OnInit } from '@angular/core';
import {Page} from "@yunzhi/ng-common";
import {CommonService} from "../../../../../projects/lib/src/service/common.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {DutyService} from "../../../../../projects/lib/src/service/duty.service";
import {getDefaultWhenValueIsInValid} from "@yunzhi/utils";
import {config} from "../../../../conf/app.config";
import {Duty} from "../../../../../projects/lib/src/entity/duty";
import {Assert} from "@yunzhi/ng-mock-api";
import {DISTRICT_TYPE} from "../../../../../projects/lib/src/entity/enum/district-type";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  // 定义一个Page<Duty>类型的变量pageData
  pageData = {} as Page<Duty>;
  formControl = new FormControl('');
  formGroup = new FormGroup({});
  /**
   * 表单关键字
   */
  formKeys = {
    page: 'page',
    size: 'size',
    name: 'name'
  };
  DistrictType = DISTRICT_TYPE;

  /**查询参数*/
  params = {} as Params;

  constructor(
    private dutyService: DutyService,
    private commonService: CommonService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    // 使用this.keys初始化FormControl，从而避免拼写错误
    this.formGroup.addControl(this.formKeys.name, new FormControl('', Validators.required));
    // 订阅参数变化
    this.route.queryParams.subscribe((params: { page?: string, size?: string }) => {
      this.params = {...params};
      // 使用参数中的数据设置formGroup
      this.formGroup.get(this.formKeys.name).setValue(params[this.formKeys.name]);

      const page = +getDefaultWhenValueIsInValid(params[this.formKeys.page], '0');
      const size = +getDefaultWhenValueIsInValid(params[this.formKeys.size], config.size.toString());
      this.dutyService.page(
        {
          page: page,
          size: size,
          name: params[this.formKeys.name]
        })
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
  private validate(page: Page<Duty>) {
    Assert.isNotNullOrUndefined(page.size, page.totalElements, page.number, '未满足初始化条件');
    page.content.forEach(post => {
      Assert.isNotNullOrUndefined(
        post.id,
        post.name,
        post.weight,
        post.typeOfDistrict,
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
  /**
   * 查询
   * @param queryParams 查询参数
   */
  reload(queryParams: QueryParams): void {
    // 将queryParams与this.queryParams合并，如果数据项有冲突，则取queryParams的
    this.params = {...this.params, ...queryParams};
    this.router.navigate(['./'],
      {
        relativeTo: this.route,
        queryParams: this.params
      }).then();
  }
  /**
   * 删除
   */
  onDelete(index: number, postId: number): void {
    this.commonService.confirm((confirm) => {
      if(confirm){
      this.dutyService.delete(postId)
        .subscribe(() => {this.commonService.success();
          this.pageData.content.splice(index, 1);
        });
      }
    });
  }

  onSubmit(queryForm: FormGroup): void {
    this.reload({...this.params, ...queryForm.value});
  }
}

type QueryParams = {
  page?: string,
  size?: string
}
