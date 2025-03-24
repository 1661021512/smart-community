import {Component, OnInit} from '@angular/core';
import {Page} from '@yunzhi/ng-common';
import {Assert, getDefaultWhenValueIsInValid} from '@yunzhi/utils';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {House} from '../../../../../projects/lib/src/entity/house';
import {Grider} from '../../../../../projects/lib/src/entity/grider';
import {HouseService} from '../../../../../projects/lib/src/service/house.service';
import {CommonService} from '../../../../../projects/lib/src/service/common.service';
import {GriderService} from '../../../../../projects/lib/src/service/grider.service';
import {config} from '../../../../conf/app.config';

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.scss']
})
export class HouseComponent implements OnInit {
  // 批量删除按钮状态
  batchDeleteDisabled = true;
  grider: Grider;
  keys = {
    page: 'page',
    size: 'size'
  }
  pageData = {} as Page<House>;
  params: Params;
  // singleChange 发送数据
  singleCheckboxChangeSubject = new Subject<void>();
  // 用于checkAll 接受变化
  singleCheckboxChange$ = this.singleCheckboxChangeSubject.asObservable();
  protected name = 'HouseComponent: ';

  constructor(private router: Router,
              private route: ActivatedRoute,
              private houseService: HouseService,
              private commonService: CommonService,
              private griderService: GriderService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params.griderId;
      Assert.isInteger(id, this.name + 'id must to int');
      this.reloadGrider(id, () => {
        this.route.queryParams.subscribe((params: {page?: string, size?: string}) => {
          this.params = params;
          this.houseService.page(
            getDefaultWhenValueIsInValid(params[this.keys.page], '0'),
            getDefaultWhenValueIsInValid(params[this.keys.size], config.size.toString()),
            {griderId: id}
          )
            .subscribe(page => {
              this.validateData(page);
              this.pageData = page;
            })
        })
      });
    })
  }

  /**
   * 批量删除
   */
  onBatchDelete(houses: House[]) {
    // ids 删除的数据的id数组
    const ids = [] as number[];
    houses.forEach(function (house) {
      if (house._checked) {
        ids.push(house.id);
      }
    })
    this.commonService.confirm((confirm = false) => {
      if (confirm) {
        this.houseService.batchRemoveGrider(ids)
          .subscribe(() => {
            this.commonService.success(() => {
              // 删除成功后判断页面数据是否为空，为空重新加载
              this.pageData.content = this.pageData.content.filter(house => !ids.includes(house.id));
              this.reComputeBatchDeleteDisabled();
              this.reloadGrider(this.grider.id);
              if (this.pageData.content.length === 0) {
                this.reload(this.params);
              }
            });
          });
      }
    }, '');
  }

  onCheckAllChange() {
    this.reComputeBatchDeleteDisabled();
  }

  /**
   * 点击分页
   * @param page 当前页
   */
  onPageChange(page: number): void {
    this.reload({...this.params, ...{page}});
  }

  /**
   * 删除
   * @param object 房屋
   * @param index 索引
   */
  onRemove(object: House, index: number): void {
    Assert.isNotNullOrUndefined(object.id, 'id未定义');
    this.commonService.confirm((confirm = false) => {
      if (confirm) {
        this.houseService.removeGrider(object.id!)
          .subscribe(() => {
            this.commonService.success(() => {
              this.pageData.content.splice(index, 1);
              if (this.pageData.content.length === 0) {
                this.reload(this.params);
              }
              this.reComputeBatchDeleteDisabled();
              this.reloadGrider(this.grider.id);
            });
          });
      }
    }, '');
  }

  onSingleChange($event: boolean, house: House) {
    house._checked = $event;
    this.singleCheckboxChangeSubject.next(null);
    this.reComputeBatchDeleteDisabled();
  }

  /**
   * 点击改变每页大小
   * @param size 每页大小
   */
  onSizeChange(size: number): void {
    this.reload({...this.params, ...{size}});
  }

  /**
   * 判断批量删除按钮状态
   */
  reComputeBatchDeleteDisabled() {
    this.batchDeleteDisabled = true;
    this.pageData.content.forEach(value => {
      if (this.batchDeleteDisabled && value._checked) {
        this.batchDeleteDisabled = false;
      }
    });
  }

  /**
   * 查询
   * @param params page: 当前页 size: 每页大小
   */
  reload(params: Params): void {
    this.params = params;
    // 发起查询params
    this.houseService.page(
      // 调用stringToIntegerNumber将查询的字符串转为number
      getDefaultWhenValueIsInValid(params[this.keys.page], '0'),
      getDefaultWhenValueIsInValid(params[this.keys.size], config.size.toString()),
      {},
    ).subscribe(page => {
      this.validateData(page);
      this.pageData = page;
    })
  }

  /**
   * 在住房发生变化后，重新加载网格员信息
   * @param griderId 网格员ID
   * @param cb 回调
   */
  reloadGrider(griderId: number, cb?: () => void) {
    this.griderService.getById(griderId)
      .subscribe(grider => {
        this.setGrider(grider);
        if (cb) {
          cb();
        }
      });
  }

  /**
   * 获取网格员
   * @param grider 网格员
   */
  setGrider(grider: Grider) {
    Assert.isObject(grider, this.name + 'house must be object');
    Assert.isDefined(
      grider.id,
      grider.houseCount,
      grider.webUser,
      grider.residentCount,
      grider.community,
      this.name + 'house validate fail');
    this.grider = grider;
  }

  /**
   * 校验数据是否满足前台列表的条件
   * @param data 分页数据
   */
  validateData(data: Page<House>): void {
    Assert.isNotNullOrUndefined(data.number, data.size, data.totalElements, '未满足page组件的初始化条件');
    data.content.forEach(house => {
      // 校验字段是否符合V层表现
      Assert.isNotNullOrUndefined(
        house.id,
        house.unit.name,
        house.name,
        house.unit.building.name,
        house.unit.building.village.name,
        house.unit.building.village.community.name,
        house.type,
        '未满足table列表的初始化条件'
      );

      Assert.isDefined(house.checkInTime, 'house.checkInTime not defined');
      Assert.isDefined(house.owner, 'house.owner not defined');
    });

    this.pageData = data;
  }
}
