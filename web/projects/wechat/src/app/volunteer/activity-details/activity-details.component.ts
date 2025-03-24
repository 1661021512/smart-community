import {Component, OnInit} from '@angular/core';
import {VolunteerActivityService} from '../../../../../lib/src/service/volunteer-activity.service';
import {ActivatedRoute} from '@angular/router';
import {VolunteerActivity} from '../../../../../lib/src/entity/volunteer-activity';
import {VolunteerActivitySignUpService} from '../../../../../lib/src/service/volunteer-activity-sign-up.service';

/**
 * 活动详情
 */
@Component({
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.scss']
})
export class ActivityDetailsComponent implements OnInit {
  /**
   * 活动是否过期
   */
  activityExpired = false;
  /**
   * 是否显示按钮
   */
  showButton = false;
  /**
   * 是否已参与
   */
  signUpEd: boolean;
  /**
   * 志愿活动
   */
  volunteerActivity: VolunteerActivity;

  constructor(private volunteerActivityService: VolunteerActivityService,
              private volunteerActivitySignUpService: VolunteerActivitySignUpService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    // 路由参数获取活动id
    this.route.params.subscribe(param => {
      const id = +param.id;
      this.volunteerActivityService.getById(id)
        .subscribe(volunteerActivity => {
          this.setData(volunteerActivity);
        })
    })
  }

  setData(volunteerActivity: VolunteerActivity) {
    this.volunteerActivity = volunteerActivity;
    this.activityExpired = VolunteerActivityService.isExpired(volunteerActivity);
    this.volunteerActivitySignUpService.existsByVolunteerActivityIdOfCurrentWechatUser(this.volunteerActivity.id)
      .subscribe(data => {
        this.signUpEd = data;
        this.showButton = true;
      });
  }
}
