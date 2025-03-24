import {Component, Input, OnInit} from '@angular/core';
import {Unit} from '../../../../../projects/lib/src/entity/unit';
import {House} from '../../../../../projects/lib/src/entity/house';
import {Assert} from '@yunzhi/utils';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HouseService} from '../../../../../projects/lib/src/service/house.service';
import {Subject} from 'rxjs';

/**
 * 楼房小样
 * @author zhangrui
 */
@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {
  editingHouse: House;
  // 获取units方法
  editingHouseChangeSubject = new Subject<void>();
  editingHouseChange$ = this.editingHouseChangeSubject.asObservable();
  formGroup = new FormGroup({}); //表单组
  formKeys = {
    name: 'name', //表单关键字
  };
  showModal = false;//窗口的启用与否
  state = {
    units: [] as Unit[],
  }

  constructor(private houseService: HouseService) {
  }

  get units(): Unit[] {
    return this.state.units;
  }

  @Input()
  set units(units: Unit[]) {
    Assert.isArray(units, 'units must be Array');
    units.forEach(unit => {
      Assert.isNotNullOrUndefined(unit.weight, '权重必须设置');
      Assert.isNotNullOrUndefined(unit._houseCountPerFloor, '每层有几户必须设置');
    })
    // units按照weight排序
    units.sort((a, b) => a.weight - b.weight);
    // 遍历units,同时创建_floors数组
    units.forEach(unit => {
      Assert.isArray(unit.houses, 'houses must be Array');
      unit._floors = Unit.getFloors(unit.houses);
    })
    this.state.units = units;
  }

  ngOnInit(): void {
    this.formGroup.addControl(this.formKeys.name, new FormControl('', Validators.required));
  }

  onEdit($event: House) {
    this.editingHouse = $event;
    this.formGroup.get(this.formKeys.name).setValue(this.editingHouse.name);
    this.showModal = true;
  }

  onSubmit(formGroup: FormGroup): void {
    //判断house.id是否存在, 当不存在时，点击保存以后直接关闭
    if (this.editingHouse.id == null) {
      this.houseNameChange(formGroup);
    } else {
      // 当house.id存在时，根据输入的值保存
      this.houseService.updateName(this.editingHouse.id, formGroup.get(this.formKeys.name).value as string)
        .subscribe(
          () => this.houseNameChange(formGroup),
          error => console.log('保存失败', error));
    }
  }

  houseNameChange(formGroup: FormGroup) {
    this.editingHouse.name = formGroup.value.name;
    this.showModal = false;
    this.editingHouseChangeSubject.next(null);
  }

  onCloseModal() {
    this.formGroup.get(this.formKeys.name).setValue(this.editingHouse.name);
    this.showModal = false;
  }
}
