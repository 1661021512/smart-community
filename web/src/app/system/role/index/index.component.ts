import {Component, Input, OnInit} from '@angular/core';
import {Page} from "@yunzhi/ng-common";
import {Role} from "../../../../../projects/lib/src/entity/role";
import {RoleService} from "../../../../../projects/lib/src/service/role.service";
import {CommonService} from "../../../../../projects/lib/src/service/common.service";
import {ActivatedRoute, Router} from "@angular/router";
import {getDefaultWhenValueIsInValid} from "@yunzhi/utils";
import {config} from "../../../../conf/app.config";

// 标记为组建
@Component({

  // 组建选择器名字为app-index
  selector: 'app-index',

  // 模版链接
  templateUrl: './index.component.html',

  // 样式链接
  styleUrls: ['./index.component.scss']
})

// 可被引用并继承OnInit的类IndexComponent
export class IndexComponent implements OnInit {

  // 定义一个Page<Role>类型的变量pageData
  pageData = {} as Page<Role>;

  /**查询参数*/
  queryParams = {} as QueryParams;

  // 构造函数，定义私有变量并声明类型
  constructor(
    private relationshipService: RoleService,
    private commonService: CommonService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  // 初始化函数，类型为void，继承OnInit就必须有此函数，且必须有函数体
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: { page?: string, size?: string }) => {
      this.queryParams = {...params};

      const page = +getDefaultWhenValueIsInValid(params.page, '0');
      const size = +getDefaultWhenValueIsInValid(params.size, config.size.toString());
      this.relationshipService.page({page, size})
        .subscribe(page => {
          this.pageData = page;
        })
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
    this.queryParams = {...this.queryParams, ...queryParams};
    this.router.navigate(['./'],
      {
        relativeTo: this.route,
        queryParams: this.queryParams
      }).then();
  }

}

type QueryParams = {
  page?: string,
  size?: string
}
