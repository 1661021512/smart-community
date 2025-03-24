import {Component, OnInit} from '@angular/core';
import {Page} from '@yunzhi/ng-common';
import {House} from 'projects/lib/src/entity/house';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {CommonService} from 'projects/lib/src/service/common.service';
import {Assert, getDefaultWhenValueIsInValid} from '@yunzhi/utils';
import {config} from '../../../conf/app.config';
import {HouseService} from 'projects/lib/src/service/house.service';

/**
 * 住房列表
 */
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  buildingIdFormControl = new FormControl(null);
  houseTypeFormControl = new FormControl(null);
  keys = {
    page: 'page',
    size: 'size',
    owner: 'owner',
    villageId: 'villageId',
    buildingId: 'buildingId',
    unitId: 'unitId',
    houseType: 'houseType'
  };
  ownerFormControl = new FormControl(null);
  pageData = {} as Page<House>;
  params: Params;
  // 缓存查询参数
  params$: Params;
  queryForm = new FormGroup({});
  unitIdFormIdControl = new FormControl(null);
  villageIdFormControl = new FormControl(null);

  constructor(private commonService: CommonService,
              private houseService: HouseService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    //订阅子组件变化
    this.villageIdFormControl.valueChanges.subscribe(() => {
      //如果小区的villageId变更 将楼fromControl置为请选择
      this.buildingIdFormControl.setValue(null);
    })
    this.buildingIdFormControl.valueChanges.subscribe(() => {
      //如果楼的buildingId变更 将单元fromControl置空
      this.unitIdFormIdControl.setValue(null);
    })
    // 使用this.keys初始化FormControl，从而避免拼写错误
    this.queryForm.addControl(this.keys.owner, this.ownerFormControl);
    this.queryForm.addControl(this.keys.villageId, this.villageIdFormControl);
    this.queryForm.addControl(this.keys.buildingId, this.buildingIdFormControl);
    this.queryForm.addControl(this.keys.unitId, this.unitIdFormIdControl);
    this.queryForm.addControl(this.keys.houseType, this.houseTypeFormControl);
    // 订阅参数变化
    this.route.queryParams.subscribe((params: {page?: string, size?: string}) => {
      this.queryForm.get(this.keys.owner).setValue(params[this.keys.owner]);
      this.queryForm.get(this.keys.villageId).setValue(params[this.keys.villageId]);
      this.queryForm.get(this.keys.buildingId).setValue(params[this.keys.buildingId]);
      this.queryForm.get(this.keys.unitId).setValue(params[this.keys.unitId]);
      this.queryForm.get(this.keys.houseType).setValue(params[this.keys.houseType]);
      getDefaultWhenValueIsInValid(params[this.keys.page], '0');
      getDefaultWhenValueIsInValid(params[this.keys.size], config.size.toString());
      this.houseService.page(
        // 调用stringToIntegerNumber将查询的字符串转为number
        getDefaultWhenValueIsInValid(params[this.keys.page], '0'),
        getDefaultWhenValueIsInValid(params[this.keys.size], config.size.toString()),
        {
          owner: params[this.keys.owner],
          houseType: params[this.keys.houseType],
          villageId: params[this.keys.villageId],
          buildingId: params[this.keys.buildingId],
          unitId: params[this.keys.unitId]
        },
      ).subscribe(page => {
        this.validateData(page);
        this.pageData = page;
      })
    });
  }

  /**
   * 删除
   * @param object 房屋
   */
  onDelete(object: House): void {
    Assert.isNotNullOrUndefined(object.id, 'id未定义');
    console.log('测试id：' + object.id);
    this.commonService.confirm((confirm = false) => {
      if (confirm) {
        const index = this.pageData.content.indexOf(object);
        this.houseService.delete(object.id!)
          .subscribe(() => {
            this.commonService.success(() => this.pageData.content.splice(index, 1));
          });
      }
    }, '');
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
   */
  reload(params: Params): void {
    this.params = params;
    if (this.params$ !== this.params) {
      this.params$ = this.params;
      const queryParams = CommonService.convertToRouteParams(this.params);
      this.router.navigate(['./'],
        {
          relativeTo: this.route,
          queryParams: queryParams,
        }).then();
    }
  }

  /**
   * 校验数据是否满足前台列表的条件
   * @param data 分页数据
   */
  validateData(data: Page<House>): void {
    Assert.isNotNullOrUndefined(data.number, data.size, data.totalElements, '未满足page组件的初始化条件');
    data.content.forEach(house => {
      // 校验字段是否符合V层表现
      Assert.isDefined(
          house.id,
          house.unit.name,
          house.name,
          house.type,
          house.area,
          house.checkInTime,
          house.lowIncoming,
          house.relief,
          house.remarks,
          house.grider,
          '未满足table列表的初始化条件'
      );

      if (house.grider) {
        Assert.isDefined(!house.grider.webUser, '未获取到网格员对应的用户信息');
      }
      Assert.isArray(house.residents, '居民类型不是数组');
      Assert.isDefined(house.checkInTime, 'house.checkInTime not defined');
      Assert.isDefined(house.owner, 'house.owner not defined');
    });

    this.pageData = data;
  }
}
