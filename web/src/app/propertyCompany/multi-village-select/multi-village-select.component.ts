import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Village} from '../../../../projects/lib/src/entity/village';
import {Assert} from '@yunzhi/utils';
import {VillageService} from '../../../../projects/lib/src/service/village.service';
import {CommonService} from '../../../../projects/lib/src/service/common.service';

@Component({
  selector: 'app-multi-village-select',
  templateUrl: './multi-village-select.component.html',
  styleUrls: ['./multi-village-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => MultiVillageSelectComponent)
    }
  ]
})
/**
 * 多选小区组件
 * 父组件传入小区数组
 * #1522
 */
export class MultiVillageSelectComponent implements OnInit {


  constructor(private commonService: CommonService,
              private villageService: VillageService) {
  }

  formGroup: FormGroup;
  formKeys = {
    villageId: 'villageId',
  }
  formControl = new FormControl();

  villages = new Array<Village>();
  /**
   * 提示小区已在列表中
   */
  remind = false;

  /**
   * 当快速点击两次添加小区时可能会出现添加了两个相同的小区问题
   * 故设置loading变量，当loading为true时不执行第二次的添加
   */
  loading = false;

  @Input()
  set setVillages(villages: Village[]) {
      this.validate(villages);
      this.villages = villages;
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({});
    this.formGroup.addControl(this.formKeys.villageId, new FormControl(''));

    // 当选择小区变化时 取消提示该小区已在列表中
    this.formGroup.get(this.formKeys.villageId).valueChanges.subscribe(() => {
      this.remind = false;
    })
  }

  /**
   * 添加选择的小区到列表中
   */
  onAddVillage(): void {
    // 防止因快速的点击 导致添加了两个相同的小区
    if (this.loading) {
      return;
    }
    this.loading = true;

    // 获取要添加的小区id
    const villageId = this.formGroup.get(this.formKeys.villageId).value as number;
    const result = this.isExist(villageId);

    // 已存在，不添加
    if (result === true) {
      this.remind = true;
      this.loading = false;
      return;
    }
    this.setVillage(villageId)
  }

  /**
   * 移除列表中的小区
   * @param index
   */
  OnDelete(index: number): void {
    Assert.isNotNullOrUndefined(index, 'index未定义');
    this.commonService.confirm((confirm: boolean) => {
      if (confirm) {
        this.villages.splice(index, 1);
      }
    }, '');
  }

  validate(villages: Village[]) {
    // 接收父组件传入的数组
    Assert.isArray(villages, 'villages must be array');
    villages.forEach(village => {
      Assert.isNotNullOrUndefined(village.name, 'village validate fail');
    });
  }

  /**
   * 判断队列中是否存在该小区
   * @param villageId 小区id
   */
  isExist(villageId: number,): boolean {
    return this.villages.map(v => v.id).includes(villageId);
  }

  /**
   *  添加该小区到列表中
   * @param villageId 小区id
   */
  setVillage(villageId: number): void {
    this.villageService.getById(villageId).subscribe((village) => {
      // 添加到列表中
      this.villages.push(village);
      // 属性清空
      this.formGroup.get(this.formKeys.villageId).setValue(null);
      this.remind = false;
      this.loading = false;
    })
  }
}
