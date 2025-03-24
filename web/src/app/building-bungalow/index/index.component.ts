import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Page} from '@yunzhi/ng-common';
import {Building} from '../../../../projects/lib/src/entity/building';
import {Village} from '../../../../projects/lib/src/entity/village';
import {Assert, getDefaultWhenValueIsInValid} from '@yunzhi/utils';
import {config} from '../../../conf/app.config';
import {House_TYPE, HouseType} from '../../../../projects/lib/src/entity/enum/house-type';
import {BuildingService} from '../../../../projects/lib/src/service/building.service';
import {VillageService} from '../../../../projects/lib/src/service/village.service';
import {ActivatedRoute, Params} from '@angular/router';
import {CommonService} from '../../../../projects/lib/src/service/common.service';

/**
 * 排管理首页
 * #986
 * @author liguowen
 */
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
  params: Params;
  village: Village;
  houseType = House_TYPE.bungalow.value;

  constructor(
    private buildingService: BuildingService,
    private villageService: VillageService,
    private route: ActivatedRoute,
    private commonService: CommonService) {
  }

  ngOnInit(): void {
    this.formGroup.addControl(this.formKeys.villageId, new FormControl(null, Validators.required));

    this.route.queryParams
      .subscribe((params: {page?: string, size?: string}) => {
        this.reload(params);
      })
  }

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
   * @param params 查询参数
   */
  reload(params: Params): void {
    this.params = params;
    this.buildingService.page({
      page: getDefaultWhenValueIsInValid(params.page, '0'),
      size: getDefaultWhenValueIsInValid(params.size, config.size.toString()),
      villageId: params.villageId ? +params.villageId : undefined,
      houseType: House_TYPE.bungalow.value as HouseType
    }).subscribe(page => {
      this.validate(page);
      this.pageData = page;
    })
  }

  /**
   * 删除
   * @param building
   * @param index
   */
  onDelete(building: Building, index: number) {
    Assert.isNotNullOrUndefined(building.id, 'id未定义');
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
