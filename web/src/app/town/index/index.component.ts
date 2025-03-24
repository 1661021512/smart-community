import {Component, OnInit} from '@angular/core';
import {Town} from '../../../../projects/lib/src/entity/town';
import {ActivatedRoute, Router} from '@angular/router';
import {TownService} from '../../../../projects/lib/src/service/town.service';
import {config} from '../../../conf/app.config';
import {Assert} from '@yunzhi/ng-mock-api';
import {CommonService} from "../../../../projects/lib/src/service/common.service";
import {Page} from '@yunzhi/ng-common';
import {getDefaultWhenValueIsInValid} from '@yunzhi/utils';

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

  // 定义一个Page<Town>类型的变量pageData
  pageData = {} as Page<Town>;

  /**查询参数*/
  queryParams = {} as QueryParams;

  // 构造函数，定义私有变量并声明类型
  constructor(
    private townService: TownService,
    private commonService: CommonService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  // 初始化函数，类型为void，继承OnInit就必须有此函数，且必须有函数体
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: { page?: string, size?: string }) => {
      this.queryParams = {...params};

      const page = +getDefaultWhenValueIsInValid(params.page, '0');
      const size = +getDefaultWhenValueIsInValid(params.size, config.size.toString());
      this.townService.page({page, size})
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
  private validate(page: Page<Town>) {
    page.content.forEach(town => {
      Assert.isNotNullOrUndefined(town.id,
        town.id,
        town.name,
        town.pinyin,
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
  onDelete(index: number, townId: number): void {
    this.commonService.confirm((confirm) => {
      if (confirm) {
        this.townService.delete(townId)
          .subscribe(() => {
            this.commonService.success();
            this.pageData.content.splice(index, 1);
          },error => console.log('删除失败', error));
      }
      });
  }
}

type QueryParams = {
  page?: string,
  size?: string
}
