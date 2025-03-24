import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {YzValidators} from '../../../../../../lib/src/validator/yz-validators';
import {VolunteerActivityService} from '../../../../../../lib/src/service/volunteer-activity.service';
import {ActivatedRoute} from '@angular/router';
import {VolunteerActivity} from '../../../../../../lib/src/entity/volunteer-activity';
import {Volunteer} from '../../../../../../lib/src/entity/volunteer';
import {SignUpInformationService} from '../../../../../../lib/src/service/sign-up-information.service';
import {VolunteerService} from '../../../../../../lib/src/service/volunteer.service';
import {WechatUser} from '../../../../../../lib/src/entity/wechat-user';
import {EducationType} from '../../../../../../lib/src/entity/enum/education-type';
import {WechatUserService} from '../../../service/wechat-user.service';
import {Observable} from 'rxjs';
import {Assert, Utils} from '@yunzhi/utils';
import {CommonService} from '../../../service/common.service';

@Component({
  selector: 'wechat-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  formGroup = new FormGroup({});

  formKeys = {
    name: 'name',
    sex: 'sex',
    birthday: 'birthday',
    homeAddress: 'homeAddress',
    phoneNumber: 'phoneNumber',
    degreeOfEducation: 'degreeOfEducation',
    introduction: 'introduction'
  }

  /**
   * 志愿者
   */
  volunteer: Volunteer;

  /**
   * 志愿活动
   */
  volunteerActivity = {} as VolunteerActivity;

  constructor(private volunteerActivityService: VolunteerActivityService,
              private route: ActivatedRoute,
              private wechatUserService: WechatUserService,
              private commonService: CommonService,
              private signUpInformationService: SignUpInformationService,
              private volunteerService: VolunteerService) {
  }

  ngOnInit(): void {
    this.initFormGroup();

    //  订阅路由
    this.route.params.subscribe(params => {
      const volunteerActivityId = +params.id;
      Assert.isInteger(volunteerActivityId, '活动ID类型不正确或未传入');
      this.volunteerActivityService.getById(volunteerActivityId)
        .subscribe(data => {
          this.volunteerActivity = data;
        });
    })

    // 获取当前微信用户对应的志愿者信息(如有)
    this.volunteerService.existsByCurrentWechatUser()
      .subscribe(result => {
        if (result) {
          this.volunteerService.getCurrentVolunteer()
            .subscribe(volunteer => this.setVolunteer(volunteer))
        }
      })
  }

  /**
   * 初始化formGroup
   */
  initFormGroup() {
    this.formGroup.addControl(this.formKeys.name, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.sex, new FormControl(true, Validators.required));
    this.formGroup.addControl(this.formKeys.birthday, new FormControl(null, Validators.required));
    this.formGroup.addControl(this.formKeys.homeAddress, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.phoneNumber, new FormControl('',
      [Validators.required, YzValidators.isChinaMobileNumber]));
    this.formGroup.addControl(this.formKeys.degreeOfEducation, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.introduction, new FormControl('', Validators.required));
  }

  /**
   * 点击提交执行
   * @param formGroup
   */
  onSubmit(formGroup: FormGroup): void {
    const wechatUser = {} as WechatUser;
    wechatUser.name = formGroup.get(this.formKeys.name).value;
    wechatUser.sex = formGroup.get(this.formKeys.sex).value as boolean;
    wechatUser.birthday =  Utils.timestampToIntDate(new Date(formGroup.get(this.formKeys.birthday).value).getTime());
    wechatUser.address = formGroup.get(this.formKeys.homeAddress).value as string;
    wechatUser.education = formGroup.get(this.formKeys.degreeOfEducation).value as EducationType;
    wechatUser.introduction = formGroup.get(this.formKeys.introduction).value as string;
    this.wechatUserService.updateCurrentWechatUser(wechatUser).subscribe();

    const phone = formGroup.get(this.formKeys.phoneNumber).value as string;
    let observable: Observable<Volunteer>;
    if (this.volunteer) {
      observable = this.volunteerService.updateCurrentVolunteerPhone(phone);
    } else {
      observable = this.volunteerService.saveOfCurrentWechatUser({phone});
    }
    observable.subscribe(() => {
      this.volunteerActivityService.signUp(this.volunteerActivity.id)
        .subscribe(() => this.commonService.success(() => this.commonService.back()));
    });
  }

  public setVolunteer(volunteer: Volunteer) {
    this.validateVolunteer(volunteer);
    this.volunteer = volunteer;
    this.formGroup.get(this.formKeys.name).setValue(volunteer.wechatUser.name);
    this.formGroup.get(this.formKeys.sex).setValue(volunteer.wechatUser.sex);
    this.formGroup.get(this.formKeys.birthday).setValue(
      new Date(Utils.intDateToTimestamp(volunteer.wechatUser.birthday)).toLocaleDateString());
    this.formGroup.get(this.formKeys.homeAddress).setValue(volunteer.wechatUser.address);
    if (volunteer.phone.length > 0) {
      this.formGroup.get(this.formKeys.phoneNumber).setValue(volunteer.phone);
    } else {
      this.formGroup.get(this.formKeys.phoneNumber).setValue(volunteer.wechatUser.mobile);
    }
    this.formGroup.get(this.formKeys.degreeOfEducation).setValue(volunteer.wechatUser.education);
    this.formGroup.get(this.formKeys.introduction).setValue(volunteer.wechatUser.introduction);
  }

  validateVolunteer(volunteer: Volunteer): void {
    Assert.isString(volunteer.phone, SignUpComponent.name + '志愿者基本属性校验错误');
    Assert.isDefined(volunteer.wechatUser, SignUpComponent.name + '对应的微信用户必须是对象');
    const wechatUser = volunteer.wechatUser;
    Assert.isDefined(wechatUser.name,
      volunteer.wechatUser,
      wechatUser.birthday,
      wechatUser.address,
      wechatUser.mobile,
      wechatUser.education, SignUpComponent.name + '微信基本属性校验错误');
  }
}
