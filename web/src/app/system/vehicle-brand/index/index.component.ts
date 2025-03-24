import {Component, OnInit} from '@angular/core';
import {Page} from "@yunzhi/ng-common";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {CommonService} from "../../../../../projects/lib/src/service/common.service";
import {Assert, getDefaultWhenValueIsInValid} from "@yunzhi/utils";
import {config} from "../../../../conf/app.config";
import {VehicleBrandService} from "../../../../../projects/lib/src/service/vehicle-brand.service";
import {VehicleBrand} from "../../../../../projects/lib/src/entity/vehicle-brand";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  keys = {
    page: 'page',
    size: 'size',
    name: 'name',
    weight: 'weight'
  };
  pageData = {} as Page<VehicleBrand>;
  params: Params;
  queryForm = new FormGroup({});
  editVehicleBrand = {} as VehicleBrand;
  showBatchEdit = false;

  constructor(private commonService: CommonService,
              private route: ActivatedRoute,
              private router: Router,
              private vehicleBrandService: VehicleBrandService) {
  }


  ngOnInit(): void {
    this.queryForm!.addControl(this.keys.name, new FormControl(''));
    // 订阅参数变化
    this.route.queryParams.subscribe((params: { page?: string, size?: string }) => {
      // 缓存查询参数
      this.params = params;
      // 使用参数中的数据设置formGroup
      this.queryForm.get(this.keys.name).setValue(params[this.keys.name]);
      getDefaultWhenValueIsInValid(params[this.keys.page], '0');
      getDefaultWhenValueIsInValid(params[this.keys.size], config.size.toString());

      // 发起查询
      this.vehicleBrandService.page(
        // 调用stringToIntegerNumber将查询的字符串转为number
        getDefaultWhenValueIsInValid(params[this.keys.page], '0'),
        getDefaultWhenValueIsInValid(params[this.keys.size], config.size.toString()),
        {
          name: params[this.keys.name]
        },
      ).subscribe(page => {
        this.validateData(page);
        this.pageData = page;
      })
    });
  }

  /**
   * 删除
   * @param object 删除的VehicleType
   */
  onDelete(object: VehicleBrand): void {
    Assert.isNotNullOrUndefined(object.id, 'id未定义');
    this.commonService.confirm((confirm = false) => {
      if (confirm) {
        const index = this.pageData.content.indexOf(object);
        this.vehicleBrandService.delete(object.id!)
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
  validateData(data: Page<VehicleBrand>): void {
    data.content.forEach(v => this.validateVehicleType(v));
    this.pageData = data;
  }

  /**
   * 校验字段是否符合V层表现
   * @param vehicleBrand
   */
  validateVehicleType(vehicleBrand: VehicleBrand): void {
    // 必有条件
    Assert.isNotNullOrUndefined(
      vehicleBrand.name,
      '未满足table列表的初始化条件'
    )
  }

  onEdit(vehicleBrand: VehicleBrand){
    this.editVehicleBrand = vehicleBrand;
    this.showBatchEdit = true;
  }
  onBatchEditClose() {
    this.showBatchEdit = false;
  }

  onBatchEditSubmit(editVehicleBrand: VehicleBrand) {
    this.editVehicleBrand.name = editVehicleBrand.name;
    this.vehicleBrandService.update(editVehicleBrand.id, this.editVehicleBrand)
      .subscribe(() => this.commonService.success(() => this.showBatchEdit = false));
  }
}
