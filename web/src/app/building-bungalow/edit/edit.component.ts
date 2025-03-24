import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Assert} from '@yunzhi/utils';
import {BuildingService} from '../../../../projects/lib/src/service/building.service';
import {Building} from '../../../../projects/lib/src/entity/building';
import {CommonService} from '../../../../projects/lib/src/service/common.service';

/**
 * 编辑排
 */
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  formKeys = {
    name: 'name',
    horizontalOffset: 'horizontalOffset',
    verticalOffset: 'verticalOffset',
    unitCount: 'unitCount'
  };
  formGroup: FormGroup;
  building = {} as Building;

  constructor(private route: ActivatedRoute,
              private commonService: CommonService,
              private buildingService: BuildingService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params.id;
      Assert.isInteger(id, '未传入id或传入的类型不正确');
      this.buildingService.getById(id)
        .subscribe(building => this.setBuilding(building));
    })
  }

  onSubmit(formGroup: FormGroup) {
    const building = {} as Building;
    building.name = formGroup.get(this.formKeys.name).value as string;
    building.unitCount = formGroup.get(this.formKeys.unitCount).value as number;
    building.horizontalOffset = formGroup.get(this.formKeys.horizontalOffset).value as number;
    building.verticalOffset = formGroup.get(this.formKeys.verticalOffset).value as number;

    this.buildingService.update(this.building.id, {...this.building, ...building})
      .subscribe(() => this.commonService.success(() => this.commonService.back()));
  }

  setBuilding(building: Building): void {
    this.validate(building);
    this.formGroup = new FormGroup({});
    this.formGroup.addControl(this.formKeys.name,
      new FormControl(building.name, Validators.required));
    this.formGroup.addControl(this.formKeys.horizontalOffset,
      new FormControl(building.horizontalOffset, Validators.required));
    this.formGroup.addControl(this.formKeys.verticalOffset,
      new FormControl(building.verticalOffset, Validators.required));
    this.formGroup.addControl(this.formKeys.unitCount,
      new FormControl(building.unitCount, Validators.required));
    this.building = building;
  }

  validate(building: Building): void {
    Assert.isInteger(building.id, 'building.id类型不正确');
  }
}
