import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {Assert} from '@yunzhi/utils';
import {ActivatedRoute, Router} from '@angular/router';
import {PropertyCompanyService} from '../../../../projects/lib/src/service/property-company.service';
import {PropertyCompany} from '../../../../projects/lib/src/entity/property-company';
import {YzValidators} from '../../../../projects/lib/src/validator/yz-validators';
import {CommonService} from '../../../../projects/lib/src/service/common.service';
import {Village} from '../../../../projects/lib/src/entity/village';

@Component({
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  propertyCompany: PropertyCompany;
  formGroup: FormGroup;
  formKeys = {
    id: 'id',
    name: 'name',
    legalPerson: 'legalPerson',
    contacts: 'contacts',
    phone: 'phone',
    score: 'score',
    timelyResponseRate: 'timelyResponseRate',
    alternateContact: 'alternateContact',
    alternatePhone: 'alternatePhone',
    createTime: 'createTime',
    address: 'address',
    villages: 'villages'
  }

  constructor(private router: Router,
              private route: ActivatedRoute,
              private propertyCompanyService: PropertyCompanyService,
              private commonService: CommonService) {
  }

  /**
   * 跨字段验证器，验证备用电话号码，当备用电话号码有内容时进行验证
   * @param formGroup
   */
  iSAlternatePhone : ValidatorFn = (formGroup: AbstractControl): ValidationErrors | null => {
    const alternatePhone = formGroup.get('alternatePhone');
    if(alternatePhone) {
      if(alternatePhone.value &&YzValidators.isChinaMobileNumber(alternatePhone)) {
        return {iSAlternatePhone: '手机号校验错误'};
      } else {
        return null;
      }
    }
    return null;
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params.id;
      Assert.isInteger(id, 'id must to int');
      // 根据id获取实体
      this.propertyCompanyService.getById(id)
        .subscribe((propertyCompany) => {
            this.setPropertyCompany(propertyCompany);
          }
        );
    })
  }

  setPropertyCompany(propertyCompany: PropertyCompany) {
    // 校验propertyCompany字段
    this.validate(propertyCompany);
    this.propertyCompany = propertyCompany;
    this.formGroup = new FormGroup({}, this.iSAlternatePhone);
    // 添加formControl，并设置value
    const formControlPhone = new FormControl(this.propertyCompany.phone,
      [Validators.required, YzValidators.isChinaMobileNumber]);
    const formControlAlternatePhone = new FormControl(this.propertyCompany.alternatePhone);
    this.formGroup.addControl(this.formKeys.name, new FormControl(this.propertyCompany.name, Validators.required));
    this.formGroup.addControl(this.formKeys.legalPerson, new FormControl(this.propertyCompany.legalPerson, Validators.required));
    this.formGroup.addControl(this.formKeys.contacts, new FormControl(this.propertyCompany.contacts, Validators.required));
    this.formGroup.addControl(this.formKeys.phone, formControlPhone);
    this.formGroup.addControl(this.formKeys.alternateContact, new FormControl(this.propertyCompany.alternateContact));
    this.formGroup.addControl(this.formKeys.alternatePhone, formControlAlternatePhone);
    this.formGroup.addControl(this.formKeys.createTime, new FormControl(this.propertyCompany.createTime, Validators.required));
    this.formGroup.addControl(this.formKeys.timelyResponseRate, new FormControl(this.propertyCompany.timelyResponseRate,[YzValidators.isInteger, Validators.required]));
    this.formGroup.addControl(this.formKeys.score, new FormControl(this.propertyCompany.score,[YzValidators.isInteger, Validators.required]));
    this.formGroup.addControl(this.formKeys.address, new FormControl(this.propertyCompany.address));
  }

  onSubmit(formGroup: FormGroup): void {
    const newPropertyCompany = {
      name: formGroup.get(this.formKeys.name).value as string,
      legalPerson: formGroup.get(this.formKeys.legalPerson).value as string,
      contacts: formGroup.get(this.formKeys.contacts).value as string,
      phone: formGroup.get(this.formKeys.phone).value as string,
      score: formGroup.get(this.formKeys.score).value as number,
      villages: this.propertyCompany.villages as Village[],
      timelyResponseRate: formGroup.get(this.formKeys.timelyResponseRate).value as number,
      createTime: formGroup.get(this.formKeys.createTime).value as number,
      alternateContact: formGroup.get(this.formKeys.alternateContact).value as string,
      alternatePhone: formGroup.get(this.formKeys.alternatePhone).value as string,
      address: formGroup.get(this.formKeys.address).value as string
    } as PropertyCompany

    this.propertyCompanyService.update(this.propertyCompany.id, newPropertyCompany)
      .subscribe(() => {
          this.commonService.success(() => this.commonService.back('../../', this.route));
        },
        error => console.log('保存失败', error))
  }

  validate(propertyCompany: PropertyCompany) {
    Assert.isObject(propertyCompany, 'propertyCompany must be object');
    // 必须条件
    Assert.isDefined(
      propertyCompany.name,
      propertyCompany.legalPerson,
      propertyCompany.timelyResponseRate,
      propertyCompany.score,
      propertyCompany.scoreRank,
      propertyCompany.contacts,
      propertyCompany.phone,
      'propertyCompany validate fail');
  }
}

