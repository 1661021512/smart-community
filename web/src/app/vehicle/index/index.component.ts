import { Component, OnInit } from '@angular/core';
import {Vehicle} from '../../../../projects/lib/src/entity/vehicle';
import {Page} from '@yunzhi/ng-common';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {CommonService} from '../../../../projects/lib/src/service/common.service';
import {VehicleService} from '../../../../projects/lib/src/service/vehicle.service';
import {Assert, getDefaultWhenValueIsInValid} from '@yunzhi/utils';
import {config} from '../../../conf/app.config';

/**
 * 车辆管理首页
 */
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  keys = {
    page: 'page',
    size: 'size',
    owner: 'owner',
    plateNumber: 'plateNumber',
    village: 'village',
    type: 'type'
  };
  pageData = {} as Page<Vehicle>;
  params: Params;
  queryForm = new FormGroup({});

  constructor(private commonService: CommonService,
              private vehicleService: VehicleService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    // 使用this.keys初始化FormControl，从而避免拼写错误
    this.queryForm!.addControl(this.keys.owner, new FormControl(''));
    this.queryForm!.addControl(this.keys.plateNumber, new FormControl(''));
    this.queryForm!.addControl(this.keys.village, new FormControl());
    this.queryForm!.addControl(this.keys.type, new FormControl());
    // 订阅参数变化
    this.route.queryParams.subscribe((params: { page?: string, size?: string }) => {
      // 缓存查询参数
      this.params = params;
      // 使用参数中的数据设置formGroup
      this.queryForm.get(this.keys.owner).setValue(params[this.keys.owner]);
      this.queryForm.get(this.keys.village).setValue(params[this.keys.village]);
      this.queryForm.get(this.keys.plateNumber).setValue(params[this.keys.plateNumber]);
      this.queryForm.get(this.keys.type).setValue(params[this.keys.type]);
      getDefaultWhenValueIsInValid(params[this.keys.page], '0');
      getDefaultWhenValueIsInValid(params[this.keys.size], config.size.toString());

      // 发起查询
      this.vehicleService.page(
        // 调用stringToIntegerNumber将查询的字符串转为number
        getDefaultWhenValueIsInValid(params[this.keys.page], '0'),
        getDefaultWhenValueIsInValid(params[this.keys.size], config.size.toString()),
        {
          owner: params[this.keys.owner],
          plateNumber: params[this.keys.plateNumber],
          villageId: params[this.keys.village],
          type: params[this.keys.type]
        },
      ).subscribe(page => {
        this.validateData(page);
        this.pageData = page;
      })
    });
  }

  /**
   * 删除
   */
  onDelete(object: Vehicle): void {
    Assert.isNotNullOrUndefined(object.id, 'id未定义');
    this.commonService.confirm((confirm = false) => {
      if (confirm) {
        const index = this.pageData.content.indexOf(object);
        this.vehicleService.delete(object.id!)
          .subscribe(() => {
            this.commonService.success(
              () => {
                this.pageData.content.splice(index, 1);
              });
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
   * @param params page: 当前页 size: 每页大小
   */
  reload(params: Params): void {
    // 将参数转换为路由参数
    const queryParams = CommonService.convertToRouteParams(params);
    console.log(queryParams);
    this.router.navigate(['./'],
      {
        relativeTo: this.route,
        queryParams: queryParams,
      }).then();
  }

  /**
   * 校验数据是否满足前台列表的条件
   * @param data 分页数据
   */
  validateData(data: Page<Vehicle>): void {
    data.content.forEach(v => this.validateVehicle(v));
    this.pageData = data;
  }

  /**
   * 校验字段是否符合V层表现
   * @param vehicle
   */
  validateVehicle(vehicle: Vehicle): void {
    // 必有条件
    Assert.isNotNullOrUndefined(
      vehicle.owner,
      vehicle.type,
      vehicle.plateNumber,
      vehicle.brand,
      '未满足table列表的初始化条件'
    )
  }
}
