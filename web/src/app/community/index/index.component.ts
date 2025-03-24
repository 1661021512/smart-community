import { Component, OnInit } from '@angular/core';
import {Community} from "../../../../projects/lib/src/entity/community";
import {ActivatedRoute, Params, Router} from '@angular/router';
import {CommunityService} from "../../../../projects/lib/src/service/community.service";
import {config} from '../../../conf/app.config';
import {Assert} from '@yunzhi/ng-mock-api';
import {Town} from "../../../../projects/lib/src/entity/town";
import {TownService} from "../../../../projects/lib/src/service/town.service";
import {Page} from '@yunzhi/ng-common';
import {getDefaultWhenValueIsInValid} from '@yunzhi/utils';
import {FormControl, FormGroup} from '@angular/forms';
import { CommonService } from 'projects/lib/src/service/common.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  // 定义一个Page<Community>类型的变量pageData
  pageData = {} as Page<Community>;

  keys = {
    page: 'page',
    size: 'size',
    name: 'name'
  };

  /**查询参数*/
  queryParams = {} as QueryParams;
  queryForm = new FormGroup({});
  //params: Params;
  nameFormControl = new FormControl('');

  constructor(
    private commonService: CommonService,
    private communityService: CommunityService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    // 使用this.keys初始化FormControl，从而避免拼写错误
    this.queryForm!.addControl(this.keys.name, this.nameFormControl);
    //console.log('community', this.route);
    //console.log('community', this.route.params);
    // 订阅参数变化
    this.route.queryParams.subscribe((params: { page?: string, size?: string }) => {
      // 缓存查询参数
      this.queryParams = {...params};
      // 使用参数中的数据设置formGroup
      this.queryForm.get(this.keys.name).setValue(params[this.keys.name]);
      const page = +getDefaultWhenValueIsInValid(params[this.keys.page], '0');
      const size = +getDefaultWhenValueIsInValid(params[this.keys.size], config.size.toString());
      console.log('测试参数：'+page+'-'+size);
      this.communityService.page({page, size, name: params[this.keys.name]})
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
  private validate(page: Page<Community>) {
    page.content.forEach(community => {
      Assert.isNotNullOrUndefined(community.id,
        community.id,
        community.name,
        community.pinyin,
        community.town.name,
        '数据校验失败，请检查'
      );
    })
  }

  /**
   * 提交查询
   * @param queryForm
   */
  onSubmit(queryForm: FormGroup): void {
    this.reload({...this.queryParams, ...queryForm.value});
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
   * @param object 用户
   */
  onDelete(object: Community): void {
    Assert.isNotNullOrUndefined(object.id, 'id未定义');
    console.log('测试id：'+ object.id);
    this.commonService.confirm((confirm = false) => {
      if (confirm) {
        const index = this.pageData.content.indexOf(object);
        this.communityService.delete(object.id!)
          .subscribe(() => {
            this.commonService.success(() => this.pageData.content.splice(index, 1));
          });
      }
    }, '');
  }
}

type QueryParams = {
  page?: string,
  size?: string
}
