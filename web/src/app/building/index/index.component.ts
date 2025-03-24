import {Component, OnInit} from '@angular/core';

import {BuildingService} from '../../../../projects/lib/src/service/building.service';
import {ActivatedRoute, Router} from '@angular/router';
import {config} from '../../../conf/app.config';
import {Page} from '@yunzhi/ng-common';
import {Building} from '../../../../projects/lib/src/entity/building';
import {Village} from '../../../../projects/lib/src/entity/village';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Assert, getDefaultWhenValueIsInValid} from '@yunzhi/utils';
import {VillageService} from '../../../../projects/lib/src/service/village.service';
import {CommonService} from '../../../../projects/lib/src/service/common.service';
import {House_TYPE, HouseType} from '../../../../projects/lib/src/entity/enum/house-type';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  /**
   * 初始化表单组
   */
  formGroup = new FormGroup({});
  /**
   * 表单关键字
   */
  formKeys = {
    villageId: 'villageId'
  };
  // 定义一个Page<Building>类型的变量pageData
  pageData = {} as Page<Building>;
  /**查询参数*/
  queryParams = {} as QueryParams;
  village: Village;

  // 构造函数,定义私有变量并声明类型
  constructor(
    private buildingService: BuildingService,
    private villageService: VillageService,
    private route: ActivatedRoute,
    private commonService: CommonService,
    private router: Router) {
  }

  /**
   * 数据校验
   * @param page 分页
   */
  private validate(page: Page<Building>) {
    page.content.forEach(building => {
      Assert.isNotNullOrUndefined(
        building.id,
        building.name,
        building.horizontalOffset,
        building.verticalOffset,
        building.type,
        building.unitCount,
        building.maxFloor,
        '校验中继器错误'
      );

      Assert.isDefined(building.village, '小区未获取到');
      Assert.isNotNullOrUndefined(building.village.name, '小区名称未获取到');

      Assert.isArray(building.units, 'units必须是数组');
    })
  }

  houseType = House_TYPE.building.value;

  ngOnInit(): void {
    this.formGroup.addControl(this.formKeys.villageId, new FormControl(null, Validators.required));

    this.route.queryParams
      .subscribe(
        (queryParams) => {
          const villageId = (queryParams.villageId ? +queryParams.villageId : undefined);
          this.formGroup.get(this.formKeys.villageId).setValue(villageId);
          const page = +getDefaultWhenValueIsInValid(queryParams.page, '0');
          const size = +getDefaultWhenValueIsInValid(queryParams.size, config.size.toString());
          this.queryParams = {...queryParams};
          const houseType = House_TYPE.building.value as HouseType;
          this.buildingService.page({page, size, villageId, houseType})
            .subscribe(page => {
              this.validate(page);
              this.pageData = page;
            })
        });
  }

  /**
   * 点击分页
   * @param page 当前页
   */
  onPageChange(page: number): void {
    this.reload({page: page.toString()});
  }

  /**
   * 点击查询按钮时，重新发起请求
   */
  onQuery() {
    const villageId = this.formGroup.get(this.formKeys.villageId).value as number;
    this.reload({villageId: Number.isInteger(villageId) ? villageId.toString() : undefined});
  }

  /**
   * 点击改变每页大小
   * @param size 每页大小
   */
  onSizeChange(size: number): void {
    this.reload({size: size.toString()});
  }

  /**
   * 分页查询
   * @param queryParams 查询参数
   */
  reload(queryParams: QueryParams): void {
    this.queryParams = {...this.queryParams, ...queryParams};

    this.router.navigate([`./`],
      {
        relativeTo: this.route,
        queryParams: this.queryParams,
      }).then();
  }

  /**
   * 删除
   */
  onDelete(building: Building, index: number) {
    Assert.isNotNullOrUndefined(building.id, 'id未定义');
    console.log('测试id：' + building.id);
    this.commonService.confirm((confirm = false) => {
      if (confirm) {
        this.buildingService.delete(building.id!)
          .subscribe(() => {
            this.commonService.success(() => this.pageData.content.splice(index, 1));
          });
      }
    }, '');
  }
}

type QueryParams = {
  page?: string,
  size?: string,
  villageId?: string
}
