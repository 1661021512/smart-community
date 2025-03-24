import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {YzValidators} from "../../../../projects/lib/src/validator/yz-validators";
import {Village} from "../../../../projects/lib/src/entity/village";
import {PropertyCompany} from "../../../../projects/lib/src/entity/property-company";
import {PropertyCompanyService} from "../../../../projects/lib/src/service/property-company.service";
import {CommonService} from "../../../../projects/lib/src/service/common.service";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  formKeys = {
    name: 'name',
    legalPerson: 'legalPerson',
    contacts: 'contacts',
    phone: 'phone',
    village: 'village',
    score: 'score',
    timelyResponseRate: 'timelyResponseRate',
    alternateContact: 'alternateContact',
    alternatePhone: 'alternatePhone',
    address: 'address',
  }
  formGroup = new FormGroup({});

  /**
   * 已添加的小区，初始为空
   */
  villages = new Array<Village>();

  constructor(private propertyCompanyService: PropertyCompanyService,
              private commonService: CommonService) {
  }

  ngOnInit(): void {
    this.initFormGroup();
    this.subscribeAlternatePhoneChange(this.formGroup.get(this.formKeys.alternatePhone))
  }

  initFormGroup() {
    const formControlPhone = new FormControl('',
      [Validators.required, YzValidators.isChinaMobileNumber]);
    const formControlAlternatePhone = new FormControl('');
    this.formGroup.addControl(this.formKeys.name, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.legalPerson, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.contacts, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.phone, formControlPhone);
    this.formGroup.addControl(this.formKeys.alternateContact, new FormControl(''));
    this.formGroup.addControl(this.formKeys.alternatePhone, formControlAlternatePhone);
    this.formGroup.addControl(this.formKeys.timelyResponseRate, new FormControl('', [YzValidators.isInteger, Validators.required]));
    this.formGroup.addControl(this.formKeys.score, new FormControl('', [YzValidators.isInteger, Validators.required]));
    this.formGroup.addControl(this.formKeys.address, new FormControl(''));
  }

  /**
   * 检测是否输入备用手机号，来判断是否需要验证备用手机号
   * @param formControl
   */
  subscribeAlternatePhoneChange(formControl: AbstractControl): void {
    formControl.valueChanges.subscribe(
      (value) => {
        if (value) {
          const alternatePhoneFormControl = new FormControl(value, YzValidators.isChinaMobileNumber);
          this.formGroup.setControl(this.formKeys.alternatePhone, alternatePhoneFormControl);
          this.subscribeAlternatePhoneChange(alternatePhoneFormControl);
        } else {
          const newAlternatePhoneFormControl = new FormControl(value);
          this.formGroup.setControl(this.formKeys.alternatePhone, newAlternatePhoneFormControl);
          this.subscribeAlternatePhoneChange(newAlternatePhoneFormControl);
        }
      }
    )
  }

  onSubmit(formGroup: FormGroup): void {
    const newPropertyCompany = {
      name: formGroup.get(this.formKeys.name).value as string,
      legalPerson: formGroup.get(this.formKeys.legalPerson).value as string,
      contacts: formGroup.get(this.formKeys.contacts).value as string,
      phone: formGroup.get(this.formKeys.phone).value as string,
      score: formGroup.get(this.formKeys.score).value as number,
      villages: this.villages as Village[],
      timelyResponseRate: formGroup.get(this.formKeys.timelyResponseRate).value as number,
      alternateContact: formGroup.get(this.formKeys.alternateContact).value as string,
      alternatePhone: formGroup.get(this.formKeys.alternatePhone).value as string,
      address: formGroup.get(this.formKeys.address).value as string
    } as PropertyCompany

    this.propertyCompanyService.save(newPropertyCompany)
      .subscribe(() => {
        this.commonService.success(() => this.commonService.back());
      },
        error => console.log('保存失败', error))

  }
}
