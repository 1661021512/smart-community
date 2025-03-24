import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Resident} from '../../../../projects/lib/src/entity/resident';
import {ActivatedRoute} from '@angular/router';
import {House} from '../../../../projects/lib/src/entity/house';
import {Assert} from '@yunzhi/utils';
import {HouseService} from '../../../../projects/lib/src/service/house.service';
import {ResidentService} from '../../../../projects/lib/src/service/resident.service';
import {Observable, Subscriber} from 'rxjs';
import {tap} from 'rxjs/operators';
import {CommonService} from '../../../../projects/lib/src/service/common.service';
import {Enterprise} from '../../../../projects/lib/src/entity/enterprise';
import {JobType} from '../../../../projects/lib/src/entity/jobType';
import {Skill} from '../../../../projects/lib/src/entity/skill';
import {RelationshipService} from '../../../../projects/lib/src/service/relationship.service';
import {YzValidators} from '../../../../projects/lib/src/validator/yz-validators';
import {ResidentRelationshipsService} from '../../../../projects/lib/src/service/resident-relationships.service';
import {ReligiousBelief} from '../../../../projects/lib/src/entity/religious-belief';
import {CrimedType} from '../../../../projects/lib/src/entity/crimed-type';
import {Cult} from '../../../../projects/lib/src/entity/cult';
import {VaccinatedValidator} from '../validator/vaccinated-validator';

/**
 * 新增
 * 由于新增时需要处理居民与户主的关系，而这个关系处理起来比较复杂。
 * 所以暂时不启用居民管理中的新增功能
 * @author panjie
 */
@Component({
  selector: 'app-resident-add',
  templateUrl: './resident-add.component.html',
  styleUrls: ['./resident-add.component.scss'],
})
export class ResidentAddComponent implements OnInit {
  public static readonly keys = {
    idNumber: 'idNumber',
    name: 'name',
    accountNumber: 'accountNumber',
    phone: 'phone',
    nationality: 'nationality',
    politicalClimate: 'politicalClimate',
    maritalStatus: 'maritalStatus',
    localDomicile: 'localDomicile',
    domicilePlace: 'domicilePlace',
    beFloating: 'beFloating',
    houses: 'houses',
    floatedDate: 'floatedDate',
    floatedPlace: 'floatedPlace',
    remarks: 'remarks',
    education: 'education',
    isOwner: 'isOwner',
    relationshipId: 'relationshipId',
    // 是否有慢性病
    beChronicDisease: 'beChronicDisease',
    // 是否残疾人
    beDisabled: 'beDisabled',
    // 是否空巢
    beEmptyNest: 'beEmptyNest',
    // 是否养老保险
    beEndowmentInsurance: 'beEndowmentInsurance',
    // 是否留守儿童
    beLeftBehindChildren: 'beLeftBehindChildren',
    // 是否孤寡
    beLonelyOrWidowed: 'beLonelyOrWidowed',
    // 是否医保
    beMedicalInsurance: 'beMedicalInsurance',
    // 是否高龄补贴
    beOldAgeAllowance: 'beOldAgeAllowance',
    // 是否低保
    beSubsistenceAllowances: 'beSubsistenceAllowances',
    // 慢性病描述
    chronicDiseaseDetails: 'chronicDiseaseDetails',
    employmentStatus: 'employmentStatus',         // 就业情况
    workPlace: 'workPlace',                       // 务工地点
    enterprise: 'enterprise',                     // 工作单位
    jobTypeRequirements: 'jobTypeRequirements',   // 工作需求
    skills: 'skills',                              // 技能、特长
    beCrimed: 'beCrimed',
    beLetterImitationPeople: 'beLetterImitationPeople',
    letterImitationContent: 'letterImitationContent',
    beCultMember: 'beCultMember',
    cult: 'cult',                           //邪教名称
    religiousBelief: 'religiousBelief',  // 宗教信仰
    beStudent: 'beStudent',
    school: 'school',
    schoolAddress: 'schoolAddress',
    beSoldier: 'beSoldier',
    beEnterToWar: 'beEnterToWar',
    beVolunteer: 'beVolunteer',
    beNuclear: 'beNuclear',
    beDisabledSolider: 'beDisabledSolider',
    // 是否接种疫苗
    beVaccinated: 'beVaccinated',
    // 接种地点
    vaccinatedPlace: 'vaccinatedPlace',
    // 未接种原因
    notVaccinatedReason: 'notVaccinatedReason'
  };
  /**当前激活显示的索引*/
  activeIndex = 0;

  @Input()
  addOrEdit = 'add' as 'add' | 'edit';
  formGroup: FormGroup;
  formKeys = ResidentAddComponent.keys;
  /**
   * 房屋信息
   */
  house = {
    id: null,
    owner: new Resident({id: null} )
  } as House;
  @Input()
  houseId: number;
  /**人员基本信息*/
  resident: Resident;
  @Input()
  residentId: number;

  constructor(private route: ActivatedRoute,
              private residentRelationshipsService: ResidentRelationshipsService,
              private houseService: HouseService,
              private residentService: ResidentService,
              private changeDetectionRef: ChangeDetectorRef,
              private relationshipService: RelationshipService,
              private commonService: CommonService) {
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
    formGroup.addControl(this.formKeys.notVaccinatedReason,new FormControl(resident.notVaccinatedReason))
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

  initFormGroup(resident: Resident) {
    this.formGroup = new FormGroup({});
    this.initBaseFormGroup(this.formGroup, resident);
    this.initAgedFormGroup(this.formGroup, resident);
    this.initJobFormGroup(this.formGroup, resident);
    this.initSecurityFormGroup(this.formGroup, resident);
    this.initSoldierFormGroup(this.formGroup, resident);
    this.initStudentFormGroup(this.formGroup, resident);
  }

  /**
   * 初始化房屋信息
   * @param houseId 房子ID
   */
  initHouseById(houseId: number) {
    this.houseService.getById(houseId).subscribe(house => {
      this.house = house;
      this.updateRelationshipFormControl(this.resident, house.owner);
    });
  }

  initJobFormGroup(formGroup: FormGroup, resident: Resident) {
    formGroup.addControl(this.formKeys.employmentStatus, new FormControl(resident.employmentStatus));
    formGroup.addControl(this.formKeys.workPlace, new FormControl(resident.workPlace));
    formGroup.addControl(this.formKeys.enterprise, new FormControl(resident.enterprise));
    formGroup.addControl(this.formKeys.jobTypeRequirements, new FormControl(resident.jobTypeRequirements));
    formGroup.addControl(this.formKeys.skills, new FormControl(resident.skills));
  }

  /**
   * 初始化居民
   */
  initResident() {
    return new Resident({
      id: null,
      idNumber: '',
      name: '',
      accountNumber: '',
      phone: '',
      nationality: 1,
      education: 0,
      employmentStatus: 0,
      politicalClimate: 0,
      maritalStatus: 0,
      localDomicile: true,
      beFloating: false,
      floatedDate: null,
      floatedPlace: '',
      remarks: '',
      beChronicDisease: false,
      beDisabled: false,
      beEmptyNest: false,
      beEndowmentInsurance: false,
      beLeftBehindChildren: false,
      beLonelyOrWidowed: false,
      beMedicalInsurance: false,
      beOldAgeAllowance: false,
      beSubsistenceAllowances: false,
      chronicDiseaseDetails: '',
      domicilePlace: '',
      enterprise: {name: ''} as Enterprise,
      workPlace: '',
      beLetterImitationPeople: false,
      jobTypeRequirements: [] as JobType[],
      letterImitationContent: '',
      beCultMember: false,
      beCrimed: false,
      crimedTypes: [] as CrimedType[],
      beSoldier: false,
      beEnterToWar: false,
      beVolunteer: false,
      beNuclear: false,
      beDisabledSolider: false,
      beStudent: false,
      skills: [] as Skill[],
      school: '',
      schoolAddress: '',
      religiousBelief: {name: ''} as ReligiousBelief,
      cult: {name: ''} as Cult,
      beVaccinated: true,
      vaccinatedPlace: '',
      notVaccinatedReason: '',
    });
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
    this.setResident(this.initResident());
    Assert.isInteger(this.houseId, '必须传入房屋ID');
    this.initHouseById(this.houseId);

    if (this.addOrEdit === 'edit') {
      Assert.isInteger(this.residentId, '居民ID类型不是number');
      this.residentService.getById(this.residentId)
        .subscribe(value => {
          this.activeIndex = -1;
          this.changeDetectionRef.detectChanges();
          this.setResident(value);
          this.activeIndex = 0;
          this.changeDetectionRef.detectChanges();
          this.updateRelationshipFormControl(value, this.house ? this.house.owner : null);
        });
    }
  }

  /**
   /**
   * 输入了系统中有的身份证号码后
   * 用户点击是，触发当前方法
   * @param resident
   */
  onResidentChange(resident: Resident) {
    this.setResident(resident);
    const activeIndex = this.activeIndex;
    this.activeIndex = -1;
    this.changeDetectionRef.detectChanges();
    this.activeIndex = activeIndex;
  }

  /**
   * 保存并关闭
   * 1. 初始化居民
   * 2. 由于住房可能变更了户主，所以重新初始化住房
   * 3. 重新渲染V层、重新初始化子组件
   */
  onSaveAndGoOn(): void {
    this.submit().subscribe({
      complete: () => {
        this.commonService.success(() => {
          this.setResident(this.initResident());
          this.initHouseById(this.house.id);
          this.activeIndex = -1;
          this.changeDetectionRef.detectChanges();
          this.activeIndex = 0;
        });
      }
    });
  }

  onSubmit() {
    this.submit().subscribe({
      complete: () => this.commonService.success()
    });
  }

  onSubmitAndClose() {
    this.submit().subscribe({
      complete:
        () => {
          this.commonService.success(
            () => {
              if (this.addOrEdit === 'add') {
                this.commonService.back('./../../', this.route);
              } else {
                this.commonService.back('./../../../../', this.route);
              }
            }
          );
        }
    });
  }

  onToggle(number: number) {
    this.activeIndex = number;
  }

  save(): Observable<Resident> {
    return this.residentService.save(this.resident).pipe(tap(resident => this.resident.id = resident.id));
  }

  setResident(resident: Resident) {
    this.resident = resident;
    this.initFormGroup(this.resident);
  }

  /**
   * 提交
   * 如果是新用户，就进行新增操作。
   * 如果是老用户，就进行更新操作。
   * 完成后调用更新住户信息、更新居民间关系接口.
   * 最终触发
   */
  submit(): Observable<void> {
    return new Observable<void>(subscriber => {
      let submitObservable: Observable<Resident>;
      if (this.resident.id) {
        submitObservable = this.update();
      } else {
        submitObservable = this.save();
      }
      submitObservable.subscribe(() => {
        // 向住房中添加人员后触发勾子
        this.residentService.addHouseIfNotExist(this.resident.id, this.house.id)
          .subscribe(() => this.submittedHookNext(subscriber));
      });
    });
  }

  /**
   * 基本的保存功能完成后，更新房主信息
   * 更新房主信息后，触发钩子。
   * 继续完成钩子的相关操作
   * @param subscriber 订阅者
   */
  submittedHookNext(subscriber: Subscriber<void>) {
    const isOwner = this.formGroup.get(this.formKeys.isOwner).value as boolean;
    Assert.isInteger(this.house.id, 'houseId类型不正确');
    Assert.isInteger(this.resident.id, 'resident类型不正确');
    this.houseService.updateOwner(this.house.id, this.resident.id, isOwner)
      .subscribe(() => {
        // 当前居民不是房主且房子有房主时，更新房主与当前居民间的关系
        if (!this.formGroup.get(this.formKeys.isOwner).value && this.house.owner && this.house.owner.id
          && (this.house.owner.id !== this.resident.id)
          && Number.isInteger(this.formGroup.get(this.formKeys.relationshipId).value)) {
          this.residentRelationshipsService.updateBetweenTwoResidents(this.formGroup.get(this.formKeys.relationshipId).value as number,
            this.house.owner.id, this.resident.id)
            .subscribe(() => subscriber.complete());
        } else {
          subscriber.complete();
        }
      });
  }

  update(): Observable<Resident> {
    return this.residentService.update(this.resident.id, this.resident);
  }

  /**
   * 更新与户主的关系
   */
  updateRelationshipFormControl(resident: Resident, owner: Resident): void {
    if (resident && resident.id && owner && owner.id) {
      this.relationshipService.getByResidentIds(resident.id, owner.id)
        .subscribe(value => {
          if (value) {
            this.formGroup.get(this.formKeys.relationshipId).setValue(value.id);
          }
        });
    }
  }

}
