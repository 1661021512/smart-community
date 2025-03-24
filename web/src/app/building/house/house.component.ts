import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HouseService} from '../../../../projects/lib/src/service/house.service';
import {BuildingService} from '../../../../projects/lib/src/service/building.service';
import {Building} from '../../../../projects/lib/src/entity/building';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Assert} from '@yunzhi/utils';
import {CommonService} from '../../../../projects/lib/src/service/common.service';
import {Unit} from '../../../../projects/lib/src/entity/unit';
import {UnitService} from '../../../../projects/lib/src/service/unit.service';
import {tap} from 'rxjs/operators';
import {House_TYPE, HouseType} from '../../../../projects/lib/src/entity/enum/house-type';

/**
 * 住房管理(自动生成住房信息)
 * @author panjie
 */
@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.scss']
})
export class HouseComponent implements OnInit {
  type: HouseType;
  building = new Building({
    unitCount: null,
    maxFloor: null,
    housesLengthOfFloor: null,
    units: [],
    houseType: 0
  });
  formGroup = new FormGroup({});
  generated = false;
  keys = {
    maxFloor: 'maxFloor',
    unitCount: 'unitCount',
    housesLengthOfFloor: 'housesLengthOfFloor',
    houseType: 'houseType'
  }
  public showDemo = true;
  private name = 'HouseComponent: ';
  public buildingType = House_TYPE.building.value;
  public bungalowType = House_TYPE.bungalow.value;

  constructor(private router: ActivatedRoute,
              private houseService: HouseService,
              private changeDetectorRef: ChangeDetectorRef,
              private buildingService: BuildingService,
              private unitService: UnitService,
              private commonService: CommonService) {
  }

  ngOnInit(): void {
    this.formGroup.addControl(this.keys.maxFloor, new FormControl(null, [Validators.required, Validators.min(1)]));
    this.formGroup.addControl(this.keys.unitCount, new FormControl(null, [Validators.required, Validators.min(1)]));
    this.formGroup.addControl(this.keys.housesLengthOfFloor, new FormControl(null, [Validators.required, Validators.min(1)]));

    this.router.params.subscribe(params => {
      const buildingId = +params.id;
      Assert.isInteger(buildingId, 'buildingId type must be number');
      this.buildingService.getById(buildingId)
        .pipe(tap(building => building.units.forEach(value => {
          value._houseCountPerFloor = building.housesLengthOfFloor;
          value._maxFloor = building.maxFloor;
        })))
        .subscribe(building =>
          this.setBuilding(building)
        )
    })
  }

  setBuilding(building: Building): void {
    this.validate(building);
    this.building = building;
    this.formGroup.get(this.keys.housesLengthOfFloor).setValue(building.housesLengthOfFloor);
    this.formGroup.get(this.keys.unitCount).setValue(building.unitCount);
    this.formGroup.get(this.keys.maxFloor).setValue(building.maxFloor);
  }

  validate(building: Building): void {
    Assert.isNumber(
      building.id,
      building.maxFloor,
      building.unitCount,
      building.housesLengthOfFloor,
      this.name + 'there is sth is not be number'
    );

    Assert.isArray(building.units, this.name + 'units type must be array');
    if (building.units.length > 0) {
      console.warn('用户正在尝试重新生成住房信息，这种操作在后台并不允许，如果当前是开发环境，请忽略');
    }
  }

  onSubmit() {
    this.commonService.confirm(confirm => {
      if (confirm) {
        this.buildingService.batchSaveUnitsWithHouses(
          this.building.id, this.building.units
        ).subscribe(() => this.commonService.success(() => this.commonService.back('./../', this.router)));
      }
    }, '楼栋详细数据即将保存，成功保存后将无法再次使用快速生成住房操作，请确认')
  }

  /**
   * 是否显示批量生成按钮
   */
  showButton() {
    if (this.building.units.length === 0) {
      return true;
    }

    let saved = false;
    this.building.units.forEach(unit => {
      if (Number.isInteger(unit.id)) {
        saved = true;
      }
    })

    return !saved;
  }

  /**
   * 批量生成
   * @param formGroup
   */
  onBatchGenerate(formGroup: FormGroup) {
    const unitCount = formGroup.get(this.keys.unitCount).value as number;
    const maxFloor = formGroup.get(this.keys.maxFloor).value as number;
    const housesLengthOfFloor = formGroup.get(this.keys.housesLengthOfFloor).value as number;

    this.building.units = this.generateUnits(unitCount, maxFloor, housesLengthOfFloor);
    this.generated = true;
  }

  /**
   * 生成单元信息
   * @param unitCount 单元数
   * @param maxFloor 层高
   * @param houseCountPerFloor 每层几户
   */
  generateUnits(unitCount: number, maxFloor: number, houseCountPerFloor: number): Unit[] {
    const units = [] as Unit[];
    const suffix = this.building.houseType === this.bungalowType ? '排' : '单元';
    for (let i = 0; i < unitCount; i++) {
      units.push(this.constructUnit(suffix, i, maxFloor, houseCountPerFloor));
    }
    return units;
  }

  constructUnit(suffix: string, i: number, maxFloor: number, houseCountPerFloor: number) {
    const unit = new Unit({
      name: i + 1 + suffix,
      _maxFloor: maxFloor,
      _houseCountPerFloor: houseCountPerFloor,
      weight: i
    });
    unit.houses = HouseService.generateHouses(maxFloor, houseCountPerFloor);
    return unit;
  }

  /**
   * 住房被重新生成时，重新渲染demo组件
   */
  doHousesChange() {
    this.showDemo = false;
    this.changeDetectorRef.detectChanges();
    this.showDemo = true;
  }
}
