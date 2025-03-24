import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HouseService} from '../../../../../../projects/lib/src/service/house.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Assert, getDefaultWhenValueIsInValid, isNotNullOrUndefined} from '@yunzhi/utils';
import {config} from '../../../../../conf/app.config';
import {House} from '../../../../../../projects/lib/src/entity/house';
import {Page} from '@yunzhi/ng-common';
import {CommonService} from '../../../../../../projects/lib/src/service/common.service';
import {GriderService} from '../../../../../../projects/lib/src/service/grider.service';
import {Grider} from '../../../../../../projects/lib/src/entity/grider';
import {District} from '../../../../../../projects/lib/src/entity/district';
import {DISTRICT_TYPE} from '../../../../../../projects/lib/src/entity/enum/district-type';

/**
 * 为网格员添加住房
 */
@Component({
  selector: 'app-grider-house-add',
  templateUrl: './grider-house-add.component.html',
  styleUrls: ['./grider-house-add.component.scss']
})
export class GriderHouseAddComponent implements OnInit {
  grider: Grider;
  griderId: number;
  keys = {
    villageId: 'villageId',
    buildingId: 'buildingId',
    // 是否已指定了网格员
    isExcludedGriderIsNotNull: 'isExcludedGriderIsNotNull'
  }
  pageData = {} as Page<House>;
  queryFormGroup: FormGroup;
  queryParams: QueryParams;

  constructor(private route: ActivatedRoute,
              private commonService: CommonService,
              private griderService: GriderService,
              private houseService: HouseService) {
  }

  filterVillage = (district: District) => {
    return district.type === DISTRICT_TYPE.village.value;
  };

  initFormGroup() {
    this.queryFormGroup = new FormGroup({});
    this.queryFormGroup.addControl(this.keys.isExcludedGriderIsNotNull, new FormControl(true));
    this.queryFormGroup.addControl(this.keys.villageId, new FormControl(null));
    this.queryFormGroup.addControl(this.keys.buildingId, new FormControl(null));
  }

  load(queryParams: QueryParams) {
    this.houseService.page(
      +getDefaultWhenValueIsInValid(queryParams.page, '0'),
      +getDefaultWhenValueIsInValid(queryParams.size, config.size.toString()),
      {
        buildingId: +queryParams.buildingId,
        villageId: +queryParams.villageId,
        isExcludedGriderIsNotNull: queryParams.isExcludedGriderIsNotNull,
        excludedGriderId: +queryParams.griderId
      }
    ).subscribe(data => this.setData(data));
  }

  /**
   * 加载网格员信息
   * @param griderId 网格员ID
   */
  loadGrider(griderId: number) {
    this.griderService.getById(griderId)
      .subscribe(data => this.grider = data);
  }

  ngOnInit(): void {
    this.initFormGroup();
    this.subscribeRouteParams();
  }

  /**
   * 当房屋添加给某个网格员
   * @param house 房屋
   * @param grider 网格员
   */
  onAddHouseToGrider(house: House, grider: Grider) {
    Assert.isInteger(house.id, '房屋或网格员ID不是数字');
    Assert.isDefined(house.grider, '网格员未定义');

    if (isNotNullOrUndefined(house.grider)) {
      this.commonService.confirm(confirmed => {
          if (confirmed) {
            this.houseService.addGrider(house.id, this.griderId)
              .subscribe(() => house.grider = this.grider);
          }
        },
        '当前房屋已指定了网格员，您确认要重新指定' + this.grider.webUser.name + '为新的网格员吗?');
    } else {
      this.houseService.addGrider(house.id, this.griderId)
        .subscribe(() => house.grider = this.grider);
    }
  }

  /**
   * 取消某个房屋上的网格员
   * @param house 房屋
   */
  onCancelGrider(house: House) {
    Assert.isInteger(house.id, '房屋ID类型不正确');
    this.houseService.removeGrider(house.id).subscribe(
      () => house.grider = null
    );
  }

  onChangePage(page: number) {
    this.reload({...this.queryParams, ...{page: page.toString()}})
  }

  onChangeSize(size: number) {
    this.reload({...this.queryParams, ...{size: size.toString()}});
  }

  onQuery(queryFormGroup: FormGroup) {
    this.reload({
      ...this.queryParams,
      ...{
        villageId: queryFormGroup.get(this.keys.villageId).value as number,
        buildingId: queryFormGroup.get(this.keys.buildingId).value as number,
        beAssignedGrider: queryFormGroup.get(this.keys.isExcludedGriderIsNotNull).value as boolean,
      }
    })
  }

  reload(params: QueryParams) {
    this.commonService.reload({...params}, this.route).then();
  }

  setData(data: Page<House>) {
    this.validate(data);
    this.pageData = data;
  }

  subscribeRouteParams() {
    this.route.params.subscribe(params => {
      Assert.isInteger(+params.griderId, '必须传入当前网格员ID');
      if (this.griderId !== +params.griderId) {
        this.griderId = +params.griderId;
        this.loadGrider(this.griderId);
      }
      this.queryParams = {
        isExcludedGriderIsNotNull: params.beAssignedGrider ? JSON.parse(params.beAssignedGrider): false,
        buildingId: params.buildingId,
        page: params.page,
        size: params.size,
        villageId: params.villageId
      };
      this.updateFormGroup(this.queryParams);
      this.load(this.queryParams);
    });
  }

  updateFormGroup(queryParams: QueryParams) {
    this.queryFormGroup.get(this.keys.villageId).setValue(queryParams.villageId);
    this.queryFormGroup.get(this.keys.buildingId).setValue(queryParams.buildingId);
    this.queryFormGroup.get(this.keys.isExcludedGriderIsNotNull).setValue(typeof queryParams.isExcludedGriderIsNotNull === 'boolean'
      ? queryParams.isExcludedGriderIsNotNull : false);
  }

  validate(data: Page<House>) {
    data.content.forEach(house => {
      Assert.isNotNullOrUndefined(house.id,
        house.type, 'house基本属性校验错误');
      Assert.isDefined(house.owner, house.grider, '房主或网格员属性校验错误');
      if (house.owner) {
        Assert.isDefined(house.owner.name, house.owner.phone, '房主信息验验错误');
      }

      Assert.isArray(house.residents, '居住人员类型不是数组');
      house.residents.forEach(resident => {
        Assert.isString(resident.name, '居住人员姓名校验错误');
      });

      if (house.grider) {
        Assert.isDefined(house.grider.webUser, '网格员中未获取到用户信息');
        Assert.isString(house.grider.webUser.name, '网格员姓名校验错误');
      }
    });
  }
}

/**
 *  查询参数
 */
interface QueryParams {
  /**
   * 楼栋ID
   */
  buildingId?: string | number,
  /**
   * 网格员ID
   */
  griderId?: string,
  /**
   * 是否排除已指定了网格员的
   */
  isExcludedGriderIsNotNull?: boolean
  page?: string,
  size?: string,

  /**
   * 小区ID
   */
  villageId?: string | number,
}
