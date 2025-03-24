import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {District} from '../../../../projects/lib/src/entity/district';
import {PartyBuilding} from '../../../../projects/lib/src/entity/partyBuilding';
import {ActivatedRoute} from '@angular/router';
import {Assert} from '@yunzhi/utils';
import {PartyBuildingService} from '../../../../projects/lib/src/service/party-building.service';
import {CommonService} from '../../../../projects/lib/src/service/common.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  district = {} as District;

  formGroup: FormGroup;
  formKeys = {
    name: 'name'
  };
  partBuilding = {} as PartyBuilding;

  constructor(private route: ActivatedRoute,
              private commonService: CommonService,
              private partBuildingService: PartyBuildingService) {
  }

  ngOnInit(): void {
    this.initFormGroup();
    this.subscribeRoute();
  }

  initFormGroup() {
    this.formGroup = new FormGroup({});
    this.formGroup.addControl(this.formKeys.name, new FormControl('', Validators.required));
  }

  onSubmit(formGroup: FormGroup) {
    this.partBuilding.personName = formGroup.get(this.formKeys.name).value as string;
    this.partBuildingService.update(this.partBuilding.id, this.partBuilding)
      .subscribe(() => this.commonService.success(this.commonService.back));
  }

  setPartBuilding(partBuilding: PartyBuilding) {
    Assert.isObject(partBuilding.duty, partBuilding.district, '未获取到岗位或区域属性');
    this.partBuilding = partBuilding;
    this.formGroup.get(this.formKeys.name).setValue(this.partBuilding.personName);
  }

  subscribeRoute(): void {
    this.route.params.subscribe(params => {
      Assert.isInteger(+params.id, '传入的参数不正确');
      this.partBuildingService.getById(+params.id)
        .subscribe(data => this.setPartBuilding(data));
    });
  }
}
