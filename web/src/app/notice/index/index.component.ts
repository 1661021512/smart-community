import { Component, OnInit } from '@angular/core';
import {Page} from "@yunzhi/ng-common";
import {FormControl, FormGroup} from "@angular/forms";
import {CommonService} from "../../../../projects/lib/src/service/common.service";
import {ActivatedRoute} from "@angular/router";
import {Assert, getDefaultWhenValueIsInValid} from "@yunzhi/utils";
import {config} from "../../../conf/app.config";
import {NoticeService} from "../../../../projects/lib/src/service/notice.service";
import {Notice} from "../../../../projects/lib/src/entity/notice";

@Component({
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  keys = {
    name: 'name'
  };
  pageData = {} as Page<Notice>;
  params: QueryParams;
  queryForm = new FormGroup({});

  constructor(
    private noticeService: NoticeService,
    private commonService: CommonService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.initFormGroup();
    this.subscribeQueryParams();
  }

  initFormGroup() {
    this.queryForm.addControl(this.keys.name, new FormControl(''));
  }

  /**
   * 查询
   * @param params page: 当前页 size: 每页大小
   */
  load(params: QueryParams): void {
    // 发起查询params
    this.noticeService.page(
      +getDefaultWhenValueIsInValid(params.page, '0'),
      +getDefaultWhenValueIsInValid(params.size, config.size.toString()),
      {
        name: params.name
      })
      .subscribe(page => {
        this.validate(page);
        this.pageData = page;
      })
  }

  /**
   * 删除
   */
  onDelete(index: number, NoticeId: number): void {
    this.commonService.confirm((confirm) => {
      if (confirm) {
        this.noticeService.delete(NoticeId)
          .subscribe(() => {
            this.commonService.success();
            this.pageData.content.splice(index, 1);
          });
      }
    });
  }

  /**
   * 点击分页
   * @param page 当前页
   */
  onPageChange(page: number): void {
    this.reload({...this.params, ...{page: page.toString()}});
  }

  /**
   * 点击改变每页大小
   * @param size 每页大小
   */
  onSizeChange(size: number): void {
    this.reload({...this.params, ...{size: size.toString()}});
  }

  onSubmit(queryForm: FormGroup): void {
    this.reload({...this.params, ...queryForm.value});
  }

  reload(param: QueryParams) {
    this.commonService.reload(param, this.route).then();
  }

  subscribeQueryParams() {
    this.route.queryParams.subscribe((params: QueryParams) => {
      this.params = {
        page: params.page,
        size: params.size,
        name: params.name
      };
      this.updateQueryForm(this.params);
      this.load(params);
    })
  }

  updateQueryForm(params: QueryParams) {
    this.queryForm.get(this.keys.name).setValue(params.name);
  }

  /**
   * 数据校验
   * @param page 分页
   */
  validate(page: Page<Notice>) {
    Assert.isNotNullOrUndefined(page.size, page.totalElements, page.number, '未满足初始化条件');
    page.content.forEach(notice => {
      Assert.isNotNullOrUndefined(
        notice.id,
        notice.createUser,
        notice.createTime,
        notice.title,
        notice.summary,
        '校验基本信息错误错误'
      );
      Assert.isNotNullOrUndefined(
        notice.createUser.name,
        '关联信息错误'
      );
    })
  }
}

interface QueryParams {
  name?: string
  page?: string,
  size?: string,
}
