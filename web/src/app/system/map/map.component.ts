import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DistrictService} from '../../../../projects/lib/src/service/district.service';
import {County} from '../../../../projects/lib/src/entity/county';
import {Attachment} from '../../../../projects/lib/src/entity/attachment';
import {Assert} from '@yunzhi/utils';
import {CommonService} from '../../../../projects/lib/src/service/common.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  /**
   * 县地图信息
   */
  countryGeoMapFormControl = new FormControl(null, Validators.required);
  county: County;
  /**
   * 县辅助地图信息
   */
  countySecondaryMapFormControl = new FormControl();
  formGroup = new FormGroup({});
  formKeys = {
    secondaryMap: 'secondaryMap',
    geoMap: 'geoMap'
  }

  constructor(private districtService: DistrictService,
              private commonService: CommonService) {
  }

  ngOnInit(): void {
    this.formGroup.addControl(this.formKeys.geoMap, this.countryGeoMapFormControl);
    this.formGroup.addControl(this.formKeys.secondaryMap, this.countySecondaryMapFormControl);
    this.districtService.getCounty().subscribe(county => {
      this.county = county;
      this.countryGeoMapFormControl.setValue(county.geoJson);
      this.countySecondaryMapFormControl.setValue(county.secondaryGeoJson);
    });
  }

  onSubmit(formGroup: FormGroup) {
    this.districtService.updateGeoMap(this.county.id,
      formGroup.get(this.formKeys.geoMap).value as Attachment,
      formGroup.get(this.formKeys.secondaryMap).value as Attachment)
      .subscribe(district => {
        Assert.isDefined(district.geoJson, district.secondaryGeoJson, '未获取到主地图或副地图信息');
        this.county.geoJson = district.geoJson;
        this.county.secondaryGeoJson = district.secondaryGeoJson;
        this.commonService.success();
      });
  }
}
