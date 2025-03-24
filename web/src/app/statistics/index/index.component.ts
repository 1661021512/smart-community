import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Page} from "@yunzhi/ng-common";
import {ActivatedRoute, Params} from "@angular/router";
import {CommonService} from "../../../../projects/lib/src/service/common.service";
import {Assert, getDefaultWhenValueIsInValid} from '@yunzhi/utils';
import {config} from "../../../conf/app.config";
import {StatisticsService} from "../../../../projects/lib/src/service/statistics.service";
import {Statistics} from "../../../../projects/lib/src/entity/statistics";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  keys = {
    name: 'name',
    page: 'page',
    size: 'size'
  };
  nameFormControl = new FormControl('');
  // 定义一个Page<Statistics>类型的变量pageData
  pageData = {} as Page<Statistics>;
  params: Params;
  queryForm = new FormGroup({});
  /**
   * 当前文件所在路径
   * @private
   */
  private readonly filePath = 'statistics/index';

  constructor(
    private statisticsService: StatisticsService,
    private commonService: CommonService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.queryForm!.addControl(this.keys.name, this.nameFormControl);
    this.route.queryParams.subscribe((params: { page?: string, size?: string }) => {
      // 使用参数中的数据设置formGroup
      this.queryForm.get(this.keys.name).setValue(params[this.keys.name]);
      this.params = {...params};
      this.reload(params);
    })
  }

  /**
   * 点击分页
   * @param page 当前页
   */
  onPageChange(page: number): void {
    this.reload({...this.params, ...{page}});
  }

  /**
   * 点击改变每页大小
   * @param size 每页大小
   */
  onSizeChange(size: number): void {
    this.reload({...this.params, ...{size}});
  }

  onSubmit(queryForm: FormGroup): void {
    this.reload({...this.params, ...queryForm.value});
  }

  /**
   * 查询
   * @param params page: 当前页 size: 每页大小
   */
  reload(params: Params): void {
    this.params = params;
    // 发起查询params
    this.statisticsService.pageOfLast(
      +getDefaultWhenValueIsInValid(params.page, '0'),
      +getDefaultWhenValueIsInValid(params.size, config.size.toString()),
      {
        userName: params[this.keys.name],
      })
      .subscribe(page => {
        this.validate(page);
        this.pageData = page;
      })
  }

  /**
   * 数据校验
   * @param page 分页
   */
  private validate(page: Page<Statistics>) {
    Assert.isNotNullOrUndefined(page.size, page.totalElements, page.number, this.filePath + '未满足初始化条件');
    page.content.forEach(statistics => {
      Assert.isNotNullOrUndefined(
        statistics.webUser,
        statistics.createTime,
        statistics.totalCount,
        this.filePath + '统计信息验证错语'
      );
      Assert.isNotNullOrUndefined(
        statistics.webUser.name,
        statistics.webUser.id,
        this.filePath + 'user name和id字段校验错误'
      )

    })
  }


}
