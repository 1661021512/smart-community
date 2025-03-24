import {Component, OnInit} from '@angular/core';
import {Page} from '@yunzhi/ng-common';
import {Grider} from '../../../../projects/lib/src/entity/grider';
import {CommonService} from '../../../../projects/lib/src/service/common.service';
import {ActivatedRoute} from '@angular/router';
import {Assert, getDefaultWhenValueIsInValid} from '@yunzhi/utils';
import {config} from '../../../conf/app.config';
import {GriderService} from '../../../../projects/lib/src/service/grider.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  keys = {
    name: 'name'
  };
  /**
   *  定义一个Page<Grider>类型的变量pageData
   */
  pageData = {} as Page<Grider>;
  params: QueryParams;
  queryForm = new FormGroup({});
  private readonly filePath = 'grider/index';

  constructor(
    private girderService: GriderService,
    private commonService: CommonService,
    private route: ActivatedRoute) {
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
    this.girderService.page(
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

  ngOnInit(): void {
    this.initFormGroup();
    this.subscribeParams();
  }

  /**
   * 删除
   */
  onDelete(index: number, griderId: number): void {
    this.commonService.confirm((confirm) => {
      if (confirm) {
        this.girderService.delete(griderId)
          .subscribe(() => {
            this.commonService.success();
            this.pageData.content.splice(index, 1);
          });
      }
    }, '删除网格员将取消该网格员关联住房的网格员设置');
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

  /**
   * 订阅查询参数，使用针对组件的params而不是是quaryParams
   */
  subscribeParams() {
    this.route.params.subscribe((params: QueryParams) => {
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
  validate(page: Page<Grider>) {
    Assert.isNotNullOrUndefined(page.size, page.totalElements, page.number, '未满足初始化条件');
    page.content.forEach(grider => {
      Assert.isNotNullOrUndefined(
        grider.id,
        grider.webUser,
        grider.community,
        grider.houseCount,
        grider.residentCount,
        this.filePath + '校验基本信息错误'
      );
      Assert.isNotNullOrUndefined(
        grider.webUser.name,
        grider.webUser.username,
        grider.community.name,
        '网格员关联信息错误'
      );
    })
  }
}

interface QueryParams {
  name?: string
  page?: string,
  size?: string,
}

