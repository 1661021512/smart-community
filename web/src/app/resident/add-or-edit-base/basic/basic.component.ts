import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Resident} from '../../../../../projects/lib/src/entity/resident';
import {Assert, isNotNullOrUndefined} from '@yunzhi/utils';
import {Subscription} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {House} from '../../../../../projects/lib/src/entity/house';
import {HouseService} from '../../../../../projects/lib/src/service/house.service';
import {ResidentService} from '../../../../../projects/lib/src/service/resident.service';
import {CommonService} from '../../../../../projects/lib/src/service/common.service';
import {ResidentRelationshipsService} from '../../../../../projects/lib/src/service/resident-relationships.service';
import {ResidentAddComponent} from '../../resident-add/resident-add.component';

/**
 * 基本情况
 */
@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent implements OnInit, OnDestroy {
  @Output()
  doResidentChange = new EventEmitter<Resident>();
  @Input()
  formGroup: FormGroup;
  formKeys = ResidentAddComponent.keys;
  idNumberCache = null;
  /**与户主关系组件*/
  @ViewChild('relationshipSelect', {static: false})
  relationshipSelectRef: ElementRef;
  state = {
    house: null as House,
    resident: new Resident({
      id: null,
      idNumber: '',
      name: '',
      accountNumber: '',
      phone: '',
      nationality: null,
      education: null,
      politicalClimate: null,
      maritalStatus: null,
      localDomicile: null,
      domicilePlace: null,
      beFloating: null,
      floatedDate: null,
      floatedPlace: '',
      remarks: ''
    })
  };

  subscriptions = [] as Subscription[];

  constructor(private houseService: HouseService,
              private changeDetectorRef: ChangeDetectorRef,
              private residentRelationshipsService: ResidentRelationshipsService,
              private residentService: ResidentService,
              private commonService: CommonService) {
  }

  get house(): House {
    return this.state.house;
  }

  /**
   * 设置房子
   * 该方法在ngOnInit前执行
   * 无户主或当前用户就是户主, 则默认将其设置为户主
   * @param house 房子
   */
  @Input()
  set house(house: House) {
    this.setOwnerFormControl(house);

    this.state.house = house;
  }

  get resident(): Resident {
    return this.state.resident;
  }

  /**居民*/
  @Input()
  set resident(resident: Resident) {
    this.validate(resident);
    this.state.resident = resident;
  };

  /**
   * 设置流动人口相关的表单验证器
   */
  initFloatingValidators() {
    const floatingControl = this.formGroup.get(this.formKeys.beFloating);
    this.resetFloatingValidators(floatingControl.value);
    this.formGroup.get(this.formKeys.beFloating).valueChanges.subscribe(value => {
      this.resetFloatingValidators(value);
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(value => value.unsubscribe());
  }

  ngOnInit(): void {
    this.subscribeFormGroupValue();
    this.initFloatingValidators();
    this.subscribeIdCardNumberValue();
    this.setOwnerFormControl(this.house);
  }

  /**
   * 重新设置流动人口表单验证验证器
   * @param addValidator true,添加验证器; false, 取消验证器
   */
  resetFloatingValidators(addValidator: boolean) {
    this.formGroup.get(this.formKeys.floatedDate).clearValidators();
    this.formGroup.get(this.formKeys.floatedPlace).clearValidators();
    if (addValidator) {
      this.formGroup.get(this.formKeys.floatedDate).setValidators(Validators.required);
      this.formGroup.get(this.formKeys.floatedPlace).setValidators(Validators.required);
    }
    this.formGroup.get(this.formKeys.floatedDate).updateValueAndValidity();
    this.formGroup.get(this.formKeys.floatedPlace).updateValueAndValidity();
  }

  setOwnerFormControl(house: House) {
    if (house) {
      if (this.formGroup.get(this.formKeys.isOwner) === null) {
        this.formGroup.addControl(this.formKeys.isOwner, new FormControl(false));
      }
      this.validateHouse(house);

      // 无户主或当前用户就是户主, 则默认将其设置为户主
      if (house.owner && (house.owner.id === this.resident.id)) {
        this.formGroup.get(this.formKeys.isOwner).setValue(true);
      } else {
        this.formGroup.get(this.formKeys.isOwner).setValue(false);
      }
    }
  }

  /**
   * 是否显示与户主关系
   * 当前居民不是户主、且当前住房的户主不是当前居民，则显示与户主关系选择框
   * @param isOwner 点击的是否为户主
   * @param owner 当前住房的户主
   * @param residentId 当前居民ID
   */
  showRelationship(isOwner: boolean, owner: Resident, residentId: number): boolean {
    Assert.isDefined(owner, 'owner未定义');
    Assert.isDefined(residentId, '居民ID未定义');
    if (!isOwner) {
      // 不存在户主肯定不显示
      if (!isNotNullOrUndefined(owner) || !isNotNullOrUndefined(owner.id)) {
        return false;
      } else if (owner.id === residentId) {
        // 存在户主，户主就是当前人员，不显示
        return false;
      }

      return true;
    }
    return false;
  };

  /**
   * 表单发生变化时，设置居民实体的值
   */
  subscribeFormGroupValue() {
    this.subscriptions.push(
      this.formGroup.valueChanges.pipe(debounceTime(500)).subscribe(value => {
        this.resident.idNumber = value[this.formKeys.idNumber];
        this.resident.name = value[this.formKeys.name];
        this.resident.accountNumber = value[this.formKeys.accountNumber];
        this.resident.phone = value[this.formKeys.phone];
        this.resident.nationality = value[this.formKeys.nationality];
        this.resident.education = value[this.formKeys.education];
        this.resident.politicalClimate = value[this.formKeys.politicalClimate];
        this.resident.maritalStatus = value[this.formKeys.maritalStatus];
        this.resident.localDomicile = value[this.formKeys.localDomicile];
        this.resident.domicilePlace = value[this.formKeys.domicilePlace];
        this.resident.beFloating = value[this.formKeys.beFloating];
        this.resident.floatedDate = value[this.formKeys.floatedDate];
        this.resident.floatedPlace = value[this.formKeys.floatedPlace];
        this.resident.remarks = value[this.formKeys.remarks];
      }));
  }

  /**
   * 当身份证号码变更且有效时，尝试去后台获取是否已经存在当前居民
   */
  subscribeIdCardNumberValue() {
    const control = this.formGroup.get(this.formKeys.idNumber);
    this.subscriptions.push(control.valueChanges
      .subscribe(value => {
        if (control.valid) {
          this.residentService.getByIdNumber(value)
            .subscribe(resident => {
              if (resident !== null) {
                this.commonService.confirm(confirmed => {
                    if (confirmed) {
                      this.doResidentChange.emit(resident);
                    } else {
                      control.setValue('');
                    }
                  },
                  `系统检测到了用户${resident.name}的数据，是否启用自动填充功能`);
              }
            });
        }
      }));
  }

  /**
   * 数据校验
   * @param resident
   */
  validate(resident: Resident) {
    Assert.isDefined(resident, '居民校验错误');
    Assert.isDefined(
      resident.idNumber,
      resident.name,
      resident.accountNumber,
      resident.phone,
      resident.nationality,
      resident.education,
      resident.politicalClimate,
      resident.maritalStatus,
      resident.localDomicile,
      resident.domicilePlace,
      resident.beFloating,
      resident.floatedDate,
      resident.floatedPlace,
      resident.remarks,
      '居民属性校验错误');
  }

  validateHouse(house: House) {
    Assert.isDefined(house.id, house.owner, 'house字段校验错误');
  }
}
