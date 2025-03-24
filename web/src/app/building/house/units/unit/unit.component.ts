import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Unit} from '../../../../../../projects/lib/src/entity/unit';
import {Assert} from '@yunzhi/utils';
import {HouseService} from '../../../../../../projects/lib/src/service/house.service';
import {House_TYPE} from "../../../../../../projects/lib/src/entity/enum/house-type";

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss']
})
export class UnitComponent implements OnInit {
  @Output()
  doHousesChange = new EventEmitter<void>();
  buildingType = House_TYPE.building.value;
  bungalowType = House_TYPE.bungalow.value;
  formGroup = new FormGroup({});
  keys = {
    id: 'id',
    name: 'name',
    maxFloor: 'maxFloor',
    houseCountPerFloor: 'houseCountPerFloor',
  }
  state = {
    unit: {} as Unit
  }

  constructor() {
    this.formGroup.addControl(this.keys.name,
      new FormControl('', [Validators.required, Validators.min(1)]));
    this.formGroup.addControl(this.keys.maxFloor,
      new FormControl(null, [Validators.required, Validators.min(1)]));
    this.formGroup.addControl(this.keys.houseCountPerFloor,
      new FormControl(null, [Validators.required, Validators.min(1)]));
  }

  get unit(): Unit {
    return this.state.unit;
  }

  @Input()
  set unit(unit: Unit) {
    Assert.isDefined(unit, 'unit 未定义.');
    Assert.isNotNullOrUndefined(unit.name, unit._maxFloor, unit._houseCountPerFloor, 'unit 属性校验错误');
    this.formGroup.get(this.keys.name).setValue(unit.name);
    this.formGroup.get(this.keys.maxFloor).setValue(unit._maxFloor);
    this.formGroup.get(this.keys.houseCountPerFloor).setValue(unit._houseCountPerFloor);
    this.state.unit = unit;
  }

  ngOnInit(): void {
    this.formGroup.valueChanges.subscribe(() => {
      this.state.unit.name = this.formGroup.get(this.keys.name).value;
      this.state.unit._maxFloor = this.formGroup.get(this.keys.maxFloor).value;
      this.state.unit._houseCountPerFloor = this.formGroup.get(this.keys.houseCountPerFloor).value;
    });
  }

  onBatchGenerateHouses(unit: Unit) {
    unit.houses = HouseService.generateHouses(unit._maxFloor, unit._houseCountPerFloor);
    this.doHousesChange.emit(null);
  }
}
