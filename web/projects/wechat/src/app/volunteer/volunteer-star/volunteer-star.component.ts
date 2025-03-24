import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {VolunteerService} from '../../../../../lib/src/service/volunteer.service';
import {Volunteer} from '../../../../../lib/src/entity/volunteer';
import {Assert} from '@yunzhi/utils';

/**
 * 志愿明星
 * @author liguowen
 */
@Component({
  templateUrl: './volunteer-star.component.html',
  styleUrls: ['./volunteer-star.component.scss']
})
export class VolunteerStarComponent implements OnInit {

  /**
   * 志愿明星
   */
  volunteerStars = [] as Volunteer[];

  constructor(private router: Router,
              private volunteerService: VolunteerService) {
  }

  ngOnInit(): void {
    this.volunteerService.getAllVolunteerStars()
      .subscribe(volunteerStars => {
        this.setData(volunteerStars);
      })
  }

  setData(volunteerStars: Volunteer[]) {
    volunteerStars.forEach(volunteerStar => {
      Assert.isObject(volunteerStar.wechatUser, VolunteerStarComponent.name + '微信用户类型不是对象');
      Assert.isDefined(volunteerStar.wechatUser.name, volunteerStar.wechatUser.education, VolunteerStarComponent.name + '微信用户基础属性校验错误');
    })
    this.volunteerStars = volunteerStars;
  }
}
