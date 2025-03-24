import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {House} from '../../../../projects/lib/src/entity/house';
import {Page} from '@yunzhi/ng-common';
import {ActivatedRoute, Params} from '@angular/router';
import {CommonService} from '../../../../projects/lib/src/service/common.service';
import {HouseService} from '../../../../projects/lib/src/service/house.service';
import {HouseType} from '../../../../projects/lib/src/entity/enum/house-type';

/**
 * 网格员管理的住房
 * 查询流程参考：https://github.com/yunzhiclub/spec/blob/main/component/1-init.md
 */
@Component({
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.scss']
})
export class HouseComponent implements OnInit {
  keys = {
    villageId: 'villageId',
    buildingId: 'buildingId',
    owner: 'owner',
    unitId: 'unitId',
    houseType: 'houseType'
  };
  pageData = {} as Page<House>;
  queryForm = new FormGroup({});
  queryParams = {} as QueryParams;

  constructor(private route: ActivatedRoute,
              private houseService: HouseService,
              private commonService: CommonService) {
  }

  getParams(params: Params) {
    return {
      page: params.page,
      size: params.size
    }
  }

  initQueryForm() {
    this.queryForm.addControl(this.keys.villageId, new FormControl());
    this.queryForm.addControl(this.keys.buildingId, new FormControl());
    this.queryForm.addControl(this.keys.owner, new FormControl());
    this.queryForm.addControl(this.keys.unitId, new FormControl());
    this.queryForm.addControl(this.keys.houseType, new FormControl());
  }

  load(params: QueryParams): void {
    this.houseService.pageOfCurrentGrider(
      +params.page,
      +params.size,
      {
        buildingId: params.buildingId,
        houseType: params.houseType,
        owner: params.owner,
        unitId: params.unitId,
        villageId: params.villageId,
      }
    ).subscribe(data => this.pageData = data);
  }

  ngOnInit(): void {
    this.initQueryForm();
    this.route.params.subscribe(params => {
      this.queryParams = params as QueryParams;
      this.updateQueryForm(this.queryParams);
      this.load(this.queryParams);
    });
  }

  onPageChange(page: number) {
    this.reload({...this.queryParams, ...{page}});
  }

  onRemove(houseId: number, index: number) {
    this.commonService.confirm(confirmed => {
      if (confirmed) {
        this.houseService.removeByCurrentGrider(houseId)
          .subscribe(() => this.commonService.success(() => {
            this.pageData.content.splice(index, 1);
          }))
      }
    });
  }

  onSizeChange(size: number) {
    this.reload({...this.queryParams, ...{size}});
  }

  onSubmit(queryForm: FormGroup) {
    this.queryParams = {
      ...this.queryParams,
      ...{
        villageId: queryForm.get('villageId').value as number,
        buildingId: queryForm.get('buildingId').value as number,
        owner: queryForm.get('owner').value as string,
        unitId: queryForm.get('unitId').value as number,
        houseType: queryForm.get('houseType').value as HouseType,
      }
    }
    this.reload(this.queryParams);
  }

  reload(param: QueryParams) {
    this.commonService.reload(param, this.route);
  }

  updateQueryForm(params: QueryParams): void {
    this.queryForm.get(this.keys.villageId).setValue(params.villageId);
    this.queryForm.get(this.keys.buildingId).setValue(params.buildingId);
    this.queryForm.get(this.keys.owner).setValue(params.owner);
    this.queryForm.get(this.keys.unitId).setValue(params.unitId);
    this.queryForm.get(this.keys.houseType).setValue(params.houseType);
  }
}

interface QueryParams {
  buildingId: number,
  houseType: HouseType,
  owner: string,
  page: number | string,
  size: number | string,
  unitId: number,
  villageId: number,
}
