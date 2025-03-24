import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {VolunteerActivitySignUp} from '../../../../../projects/lib/src/entity/volunteer-activity-sign-up';
import {Assert} from '@yunzhi/utils';
import {VolunteerActivitySignUpService} from '../../../../../projects/lib/src/service/volunteer-activity-sign-up.service';
import {SIGN_UP_STATUS} from '../../../../../projects/lib/src/entity/enum/sign-up-status';
import {CommonService} from '../../../../../projects/lib/src/service/common.service';

/**
 * 审核志愿活动报名信息
 */
@Component({
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.scss']
})
export class AuditComponent implements OnInit {
  signUps = [] as VolunteerActivitySignUp[];

  constructor(private route: ActivatedRoute,
              private commonService: CommonService,
              private singUpService: VolunteerActivitySignUpService) {
  }

  setData(signUps: VolunteerActivitySignUp[]) {
    signUps.forEach(signUp => {
      Assert.isObject(signUp.volunteer, '志愿者信息不能为空');
      Assert.isObject(signUp.volunteer.wechatUser, '微信用户信息不能为空');
      Assert.isDefined(signUp.volunteer.phone, '志愿者基础信息校验失败');
      const wechatUser = signUp.volunteer.wechatUser;
      Assert.isDefined(wechatUser.name,
        wechatUser.sex,
        wechatUser.education,
        wechatUser.birthday,
        wechatUser.address,
        wechatUser.introduction, '微信用户基础信息校验错误');
    });
    this.signUps = signUps;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const activityId = +params.id;
      Assert.isInteger(activityId, '活动ID类型不正确或未传入');
      this.singUpService.getAllByVolunteerActivityId(activityId)
        .subscribe(data => this.setData(data));

    })
  }

  showApprovedButton(signUp: VolunteerActivitySignUp) {
    return signUp.status === SIGN_UP_STATUS.new.value;
  }

  showRefuseButton(signUp: VolunteerActivitySignUp) {
    return signUp.status === SIGN_UP_STATUS.new.value;
  }

  onApproved(signUp: VolunteerActivitySignUp) {
    this.commonService.confirm(confirmed => {
      if (confirmed) {
        this.singUpService.approved(signUp.id)
          .subscribe(data => {
            signUp.status = data.status;
            this.commonService.success();
          })
      }
    })
  }

  onRefuse(signUp: VolunteerActivitySignUp) {
    this.commonService.confirm(confirmed => {
      if (confirmed) {
        this.singUpService.refused(signUp.id)
          .subscribe(data => {
            signUp.status = data.status;
            this.commonService.success();
          })
      }
    })
  }
}
