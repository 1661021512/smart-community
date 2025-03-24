import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Building} from '../../../../projects/lib/src/entity/building';
import {Assert} from '@yunzhi/utils';
import {BuildingService} from '../../../../projects/lib/src/service/building.service';
import {Unit} from '../../../../projects/lib/src/entity/unit';
import {House} from '../../../../projects/lib/src/entity/house';
import {CommonService} from '../../../../projects/lib/src/service/common.service';
import {HouseService} from '../../../../projects/lib/src/service/house.service';

/**
 * 生成住房
 */
@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.scss']
})
export class HouseComponent implements OnInit {
  formGroup: FormGroup;
  keys = {
    unitCount: 'unitCount'
  };
  generated = false;
  building = {} as Building;

  constructor(private route: ActivatedRoute,
              private commonService: CommonService,
              private houseService: HouseService,
              private router: Router,
              private buildingService: BuildingService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const buildingId = +params.buildingId;
      Assert.isInteger(buildingId, 'buildingId未传入或传入的类型不是number');
      this.buildingService.getById(buildingId)
        .subscribe(building => {
          this.setBuilding(building);
        })
    });
  }

  onSubmit(building: Building) {

    this.commonService.confirm(confirm => {
      if (confirm) {
        this.buildingService.batchSaveUnitsWithHouses(
          building.id, building.units
        ).subscribe(() => this.commonService.success(() => this.commonService.back('./../', this.router)))
      }
    }, '详细数据即将保存，成功保存后将无法再次使用快速生成住房操作，请确认')
  }

  onBatchGenerate(formGroup: FormGroup) {
    const unitCount = formGroup.get(this.keys.unitCount).value as number;
    this.building.units = [] as Unit[];
    for (let i = 0; i < unitCount; i++) {
      const unit = {
        name: '',
        houses: [],
        weight: i,
        _houseCountPerFloor: 1
      } as Unit;
      unit.houses.push({
        name: (i + 1).toString(10),
        weight: i,
        floor: 1
      } as House)
      this.building.units.push(unit)
    }
    this.generated = true;
  }

  setBuilding(building: Building) {
    Assert.isNumber(building.unitCount, '未接收到unitCount');
    Assert.isString(building.name, '未接收到名称');
    this.building = building;
    this.formGroup = new FormGroup({});
    this.formGroup.addControl(this.keys.unitCount, new FormControl(building.unitCount,
      [Validators.required, Validators.min(1)]));
  }
}
