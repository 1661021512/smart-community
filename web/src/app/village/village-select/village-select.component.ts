import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Village} from '../../../../projects/lib/src/entity/village';
import {VillageService} from '../../../../projects/lib/src/service/village.service';
import {Assert} from '@yunzhi/utils';
import {Community} from '../../../../projects/lib/src/entity/community';
import {DistrictService} from '../../../../projects/lib/src/service/district.service';
import {DISTRICT_TYPE} from '../../../../projects/lib/src/entity/enum/district-type';
import {House_TYPE, HouseType} from "../../../../projects/lib/src/entity/enum/house-type";

/**
 * 小区选择组件
 * 参考：
 * <ul>
 *   <li> https://stackblitz.com/run?file=src%2Fgroup-function-example.component.ts
 *   <li> https://stackblitz.com/run?file=src/group-children-example.component.html
 *   <li> https://stackblitz.com/run?file=src%2Fgroup-default-example.component.html
 *   <li> https://www.npmjs.com/package/@ng-select/ng-select
 */
@Component({
  selector: 'app-village-select',
  templateUrl: './village-select.component.html',
  styleUrls: ['./village-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => {
        return VillageSelectComponent;
      })
    }]
})
export class VillageSelectComponent implements OnInit, ControlValueAccessor {
  /**
   * 是否允许清除内容
   */
  @Input()
  clearable = true;
  /**
   * 房屋类型默认为楼房
   */
  @Input()
  houseType: HouseType;
  /**
   * 用户主动选择或是由父组件传入后被动选择的小区
   */
  villageSelected = new FormControl(null);
  /**
   * 所有小区
   */
  villages = new Array<Village>();

  constructor(private villageService: VillageService,
              private districtService: DistrictService) {
  }

  /**
   * 根据社区进行分组
   * @param village 小区
   */
  groupBy(village: Village) {
    Assert.isDefined(village.community, 'community is defined');
    Assert.isNumber(village.community.id, 'community id is number');
    return village.community.id;
  };

  /**
   * 返回V层显示分组名称的Community
   * @param key 分组关键字
   * @param children 子小区
   */
  groupValue(key: string | object, children: Village[]): Community {
    const community = children[0].community;
    Assert.isDefined(community.town, 'town must be defined');
    Assert.isString(community.name,
      community.town.name,
      'name must be string');
    return children[0].community;
  }

  ngOnInit(): void {
    this.districtService.getDistrictsOfCurrentLoginUser(DISTRICT_TYPE.village.value)
      .subscribe(districts => {
        const districtIds = districts.map(value => value.id);
        // 当前登录用户区域
        this.villageService.getAll().subscribe(villages => {
          // 对所有villages 进行筛选
          villages = villages.filter(value => districtIds.includes(value.id));
          // 若houseType不为undefined，则根据值显示小区或片区 若为undefined则显示片区+小区
          if(typeof this.houseType !== 'undefined'){
            villages = villages.filter(value => value.houseType === this.houseType)
          }
          this.validate(villages);
          this.villages = villages;
        });
      });

  }

  /**
   * 用户输入时进行搜索
   * @param inputKey 用户输入的关键字
   * @param village 与小区相区是否匹配
   */
  onSearch(inputKey: string, village: Village): boolean {
    return village.name.includes(inputKey) || village.pinyin.includes(inputKey);
  }

  /**
   * 较验V层用到的基本字段
   * @param villages 小区
   */
  validate(villages: Array<Village>) {
    Assert.isTrue(Array.isArray(villages), '数据类型必须为数组');
    villages.forEach(village => {
      Assert.isDefined(village.id,
        village.name,
        'village miss some properties');
    });
  }

  /**
   * 组件需要向父组件弹值时，直接调用参数中的fn方法
   * 相当于@Output()
   * @param fn 此类型取决于当前组件的弹出值类型，比如当前将弹出一个类型为number的id
   */
  registerOnChange(fn: (data: number) => void) {
    this.villageSelected.valueChanges
      .subscribe((data: number) => {
        fn(data);
      });
  }

  registerOnTouched(fn: any): void {
  }

  /**
   * 将FormControl中的值通过此方法写入
   * FormControl的值每变换一次，该方法将被重新执行一次
   * 相当于@Input() set xxx
   * @param value 此类型取决于当前组件的接收类型，比如接收一个类型为number的Id
   */
  writeValue(value: number | string): void {
    let villageId = value;
    if (typeof value === 'string') {
      villageId = +value;
    }
    if (!Number.isInteger(villageId)) {
      villageId = null;
    }
    this.villageSelected.setValue(villageId);
  }
}
