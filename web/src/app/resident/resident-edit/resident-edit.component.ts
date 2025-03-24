import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ResidentService} from '../../../../projects/lib/src/service/resident.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Assert} from '@yunzhi/utils';
import {Resident} from '../../../../projects/lib/src/entity/resident';
import {YzValidators} from '../../../../projects/lib/src/validator/yz-validators';
import {ResidentAddComponent} from '../resident-add/resident-add.component';
import {CommonService} from '../../../../projects/lib/src/service/common.service';
import {VaccinatedValidator} from '../validator/vaccinated-validator';

/**
 * 编辑居民信息
 */
@Component({
  selector: 'app-resident-edit',
  templateUrl: './resident-edit.component.html',
  styleUrls: ['./resident-edit.component.scss']
})
export class ResidentEditComponent implements OnInit {
  activeIndex = 0;
  formGroup: FormGroup;
  formKeys = ResidentAddComponent.keys;
  @Input()
  resident: Resident;

  constructor(private route: ActivatedRoute,
              private commonService: CommonService,
              private residentService: ResidentService) {
  }

  initAgedFormGroup(formGroup: FormGroup, resident: Resident) {
    formGroup.addControl(this.formKeys.beChronicDisease, new FormControl(resident.beChronicDisease));
    formGroup.addControl(this.formKeys.beDisabled, new FormControl(resident.beDisabled));
    formGroup.addControl(this.formKeys.beEmptyNest, new FormControl(resident.beEmptyNest));
    formGroup.addControl(this.formKeys.beEndowmentInsurance, new FormControl(resident.beEndowmentInsurance));
    formGroup.addControl(this.formKeys.beLeftBehindChildren, new FormControl(resident.beLeftBehindChildren));
    formGroup.addControl(this.formKeys.beLonelyOrWidowed, new FormControl(resident.beLonelyOrWidowed));
    formGroup.addControl(this.formKeys.beMedicalInsurance, new FormControl(resident.beMedicalInsurance));
    formGroup.addControl(this.formKeys.beOldAgeAllowance, new FormControl(resident.beOldAgeAllowance));
    formGroup.addControl(this.formKeys.beSubsistenceAllowances, new FormControl(resident.beSubsistenceAllowances));
    formGroup.addControl(this.formKeys.chronicDiseaseDetails, new FormControl(resident.chronicDiseaseDetails));
    formGroup.addControl(this.formKeys.beVaccinated, new FormControl(resident.beVaccinated));
    formGroup.addControl(this.formKeys.vaccinatedPlace, new FormControl(resident.vaccinatedPlace));
    formGroup.addControl(this.formKeys.notVaccinatedReason, new FormControl(resident.notVaccinatedReason));
    // 增加验证器，对是否接种疫苗和接种地点或原因同时验证
    formGroup.setValidators(VaccinatedValidator);
  }

  initBaseFormGroup(formGroup: FormGroup, resident: Resident) {
    formGroup.addControl(this.formKeys.idNumber, new FormControl(resident.idNumber, [Validators.required, YzValidators.isChinaIdCardNumber]));
    formGroup.addControl(this.formKeys.name, new FormControl(resident.name, Validators.required));
    formGroup.addControl(this.formKeys.accountNumber, new FormControl(resident.accountNumber, Validators.required));
    formGroup.addControl(this.formKeys.phone, new FormControl(resident.phone, [Validators.required, YzValidators.isChinaMobileNumber]));
    formGroup.addControl(this.formKeys.nationality, new FormControl(resident.nationality, Validators.required));
    formGroup.addControl(this.formKeys.education, new FormControl(resident.education, Validators.required));
    formGroup.addControl(this.formKeys.politicalClimate, new FormControl(resident.politicalClimate));
    formGroup.addControl(this.formKeys.maritalStatus, new FormControl(resident.maritalStatus));
    formGroup.addControl(this.formKeys.localDomicile, new FormControl(resident.localDomicile));
    formGroup.addControl(this.formKeys.domicilePlace, new FormControl(resident.domicilePlace));
    formGroup.addControl(this.formKeys.beFloating, new FormControl(resident.beFloating));
    formGroup.addControl(this.formKeys.floatedDate, new FormControl(resident.floatedDate));
    formGroup.addControl(this.formKeys.floatedPlace, new FormControl(resident.floatedPlace));
    formGroup.addControl(this.formKeys.remarks, new FormControl(resident.remarks));
    formGroup.addControl(this.formKeys.relationshipId, new FormControl(null));
    formGroup.addControl(this.formKeys.isOwner, new FormControl(false, Validators.required));
  }

  initFormGroup(resident: Resident): FormGroup {
    const formGroup = new FormGroup({});
    this.initBaseFormGroup(formGroup, resident);
    this.initAgedFormGroup(formGroup, resident);
    this.initJobFormGroup(formGroup, resident);
    this.initSecurityFormGroup(formGroup, resident);
    this.initSoldierFormGroup(formGroup, resident);
    this.initStudentFormGroup(formGroup, resident);
    return formGroup;
  }

  initJobFormGroup(formGroup: FormGroup, resident: Resident) {
    formGroup.addControl(this.formKeys.employmentStatus, new FormControl(resident.employmentStatus));
    formGroup.addControl(this.formKeys.workPlace, new FormControl(resident.workPlace));
    formGroup.addControl(this.formKeys.enterprise, new FormControl(resident.enterprise));
    formGroup.addControl(this.formKeys.jobTypeRequirements, new FormControl(resident.jobTypeRequirements));
    formGroup.addControl(this.formKeys.skills, new FormControl(resident.skills));
  }

  initSecurityFormGroup(formGroup: FormGroup, resident: Resident) {
    formGroup.addControl(this.formKeys.beCrimed, new FormControl(resident.beCrimed));
    formGroup.addControl(this.formKeys.beLetterImitationPeople, new FormControl(resident.beLetterImitationPeople));
    formGroup.addControl(this.formKeys.letterImitationContent, new FormControl(resident.letterImitationContent));
    formGroup.addControl(this.formKeys.beCultMember, new FormControl(resident.beCultMember));
    formGroup.addControl(this.formKeys.cult, new FormControl(resident.cult));
    formGroup.addControl(this.formKeys.religiousBelief, new FormControl(resident.religiousBelief));
  }

  initSoldierFormGroup(formGroup: FormGroup, resident: Resident) {
    formGroup.addControl(this.formKeys.beSoldier, new FormControl(resident.beSoldier));
    formGroup.addControl(this.formKeys.beEnterToWar, new FormControl(resident.beEnterToWar));
    formGroup.addControl(this.formKeys.beVolunteer, new FormControl(resident.beVolunteer));
    formGroup.addControl(this.formKeys.beNuclear, new FormControl(resident.beNuclear));
    formGroup.addControl(this.formKeys.beDisabledSolider, new FormControl(resident.beDisabledSolider));
  }

  initStudentFormGroup(formGroup: FormGroup, resident: Resident) {
    formGroup.addControl(this.formKeys.beStudent, new FormControl(resident.beStudent));
    formGroup.addControl(this.formKeys.school, new FormControl(resident.school));
    formGroup.addControl(this.formKeys.schoolAddress, new FormControl(resident.schoolAddress));
  }

  isActive(number: number) {
    return number === this.activeIndex;
  }

  ngOnInit(): void {
    this.validate(this.resident);
    this.formGroup = this.initFormGroup(this.resident);
  }

  onSubmit() {
    this.save().subscribe(() => {
      this.commonService.success(() => this.commonService.back());
    });
  }

  onToggle(number: number) {
    this.activeIndex = number;
  }

  validate(resident: Resident) {
    Assert.isDefined(resident, 'resident must be defined');
    Assert.isDefined(resident.cult, resident.religiousBelief, resident.enterprise, '关联实体信息未定义');
    Assert.isArray(resident.skills, resident.crimedTypes, resident.houses, resident.jobTypeRequirements,
      '关联实体数据类型校验错误');
  }

  /**
   * 仅保存
   */
  onSave() {
    this.save().subscribe(() => this.commonService.success());
  }

  save() {
    return this.residentService.update(this.resident.id, this.resident);
  }
}
