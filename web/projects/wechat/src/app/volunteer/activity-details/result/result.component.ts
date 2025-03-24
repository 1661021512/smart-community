import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CommonService} from '../../../service/common.service';
import {Assert} from '@yunzhi/utils';
import {VolunteerActivitySignUpService} from '../../../../../../lib/src/service/volunteer-activity-sign-up.service';
import {VolunteerActivitySignUp} from '../../../../../../lib/src/entity/volunteer-activity-sign-up';
import {SIGN_UP_STATUS} from '../../../../../../lib/src/entity/enum/sign-up-status';

/**
 * 查看志愿者活动报名结果
 */
@Component({
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  signUp: VolunteerActivitySignUp;
  signUpStatus = SIGN_UP_STATUS;

  constructor(private route: ActivatedRoute,
              private commonService: CommonService,
              private signUpService: VolunteerActivitySignUpService) {
  }

  setSignUp(signUp: VolunteerActivitySignUp) {
    this.signUp = signUp;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const volunteerActivityId = +params.id;
      Assert.isInteger(volunteerActivityId, '活动ID类型不正确或未传入');
      this.signUpService.getByActivityIdOfCurrentWechatUser(volunteerActivityId)
        .subscribe(data => this.setSignUp(data));
    });
  }

  onBack() {
    this.commonService.back();
  }
}
