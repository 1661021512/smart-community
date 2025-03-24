import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {Resident} from '../../../../../projects/lib/src/entity/resident';
import {Assert} from '@yunzhi/utils';
import {ResidentAddComponent} from '../../resident-add/resident-add.component';
import {Subscription} from 'rxjs';

/**
 * 老幼儿(人文关怀)
 */
@Component({
  selector: 'app-aged',
  templateUrl: './aged.component.html',
  styleUrls: ['./aged.component.scss'],
})
export class AgedComponent implements OnInit, OnDestroy {
  @Input()
  formGroup = new FormGroup({});
  formKeys = ResidentAddComponent.keys;
  @Input()
  resident: Resident;

  subscriptions = [] as Subscription[];
  constructor() {
  }

  /**
   * 重新设置慢性病描述的验证器
   * @param addValidator 是否添加验证器
   */
  resetChronicDiseaseValidators(addValidator: boolean) {
    const control = this.formGroup.get(this.formKeys.chronicDiseaseDetails);
    control.clearValidators();
    if (addValidator) {
      control.setValidators(Validators.required);
    }
    control.updateValueAndValidity();
  }

  /**
   * 初始化动态验证器
   * 有慢性病的话，加入慢性病详情描述验证器
   */
  initDynamicValidators() {
    const beChronicDiseaseControl = this.formGroup.get(this.formKeys.beChronicDisease);
    this.resetChronicDiseaseValidators(beChronicDiseaseControl.value);
    beChronicDiseaseControl.valueChanges.subscribe(value => {
      this.resetChronicDiseaseValidators(value);
    });
  }

  ngOnInit(): void {
    Assert.isDefined(this.resident, '未接收到的正确的居民信息');
    this.subscribeFormGroupValue();
    this.initDynamicValidators();
  }

  /**
   * 表单组值发生变化时，重新设置居民信息
   */
  subscribeFormGroupValue() {
    this.subscriptions.push(this.formGroup.valueChanges.subscribe(() => {
      this.resident.beChronicDisease = this.formGroup.get(this.formKeys.beChronicDisease).value;
      this.resident.beDisabled = this.formGroup.get(this.formKeys.beDisabled).value;
      this.resident.beEmptyNest = this.formGroup.get(this.formKeys.beEmptyNest).value;
      this.resident.beEndowmentInsurance = this.formGroup.get(this.formKeys.beEndowmentInsurance).value;
      this.resident.beLeftBehindChildren = this.formGroup.get(this.formKeys.beLeftBehindChildren).value;
      this.resident.beLonelyOrWidowed = this.formGroup.get(this.formKeys.beLonelyOrWidowed).value;
      this.resident.beMedicalInsurance = this.formGroup.get(this.formKeys.beMedicalInsurance).value;
      this.resident.beOldAgeAllowance = this.formGroup.get(this.formKeys.beOldAgeAllowance).value;
      this.resident.beSubsistenceAllowances = this.formGroup.get(this.formKeys.beSubsistenceAllowances).value;
      this.resident.chronicDiseaseDetails = this.formGroup.get(this.formKeys.chronicDiseaseDetails).value;
      this.resident.beVaccinated = this.formGroup.get(this.formKeys.beVaccinated).value;
      this.resident.vaccinatedPlace = this.formGroup.get(this.formKeys.vaccinatedPlace).value;
      this.resident.notVaccinatedReason = this.formGroup.get(this.formKeys.notVaccinatedReason).value;
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(value => value.unsubscribe());
  }

}
