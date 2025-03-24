import {Component, Input, OnInit} from '@angular/core';
import {Village} from '../../../../projects/lib/src/entity/village';
import {VillageService} from '../../../../projects/lib/src/service/village.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {config} from '../../../conf/app.config';
import {CommonService} from '../../../../projects/lib/src/service/common.service';
import {Page} from '@yunzhi/ng-common';
import {Assert, getDefaultWhenValueIsInValid} from '@yunzhi/utils';
import {FormControl, FormGroup} from '@angular/forms';
import {House_TYPE, HouseType} from '../../../../projects/lib/src/entity/enum/house-type';

@Component({
  selector: 'app-village-index',
  templateUrl: './village-index.component.html',
  styleUrls: ['./village-index.component.scss']
})
export class VillageIndexComponent implements OnInit {
  nameFormControl = new FormControl('');

  // 定义一个Page<Village>类型的变量pageData
  pageData = {} as Page<Village>;

  /**查询参数*/
  queryParams = {} as QueryParams;
  params: Params;
  queryForm = new FormGroup({});

  /**
   * 房屋类型默认为楼房
   */
  @Input()
  houseType = House_TYPE.building.value as HouseType;

  /**
   * 表单关键字
   */
  formKeys = {
    name: 'name',
  };

  // 构造函数，定义私有变量并声明类型
  constructor(
    private villageService: VillageService,
    private commonService: CommonService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  /**
   * 数据校验
   * @param page 分页
   */
  private validate(page: Page<Village>) {
    page.content.forEach(village => {
      Assert.isNotNullOrUndefined(
        village.id,
        village.name,
        village.pinyin,
        village.longitude,
        village.latitude,
        village.establishTime,
        village.type,
        village.community.name,
        village.community.town.name,
        '数据校验失败，请检查'
      );

      Assert.isNotNullOrUndefined(village.community.name, village.community.town, self.name + ' 社区属性校验错误');
      Assert.isNotNullOrUndefined(village.community.town.name, village.community.town, self.name + ' 乡镇名称校验错误');
    })
  }

  // 初始化函数，类型为void，继承OnInit就必须有此函数，且必须有函数体
  ngOnInit(): void {
    this.queryForm!.addControl(this.formKeys.name, this.nameFormControl);
    this.route.queryParams.subscribe((params: {page?: string, size?: string}) => {
      this.queryParams = {...params};
      this.queryForm.get(this.formKeys.name).setValue(params[this.formKeys.name]);
      const page = +getDefaultWhenValueIsInValid(params.page, '0');
      const size = +getDefaultWhenValueIsInValid(params.size, config.size.toString());
      this.villageService.page(
        {
          page,
          size,
          houseType: this.houseType,
          name: params[this.formKeys.name],
        },
      ).subscribe(page => {
        this.validate(page);
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
  onDelete(index: number, villageId: number): void {
    this.commonService.confirm(confirm => {
      if (confirm) {
        this.villageService.delete(villageId)
          .subscribe(() => {
            this.commonService.success();
            this.pageData.content.splice(index, 1);
          }, error => console.log('删除失败', error));
      }
    });
  }
}

type QueryParams = {
  page?: string,
  size?: string,
  name?: string
}
