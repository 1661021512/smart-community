import {Component, OnInit} from '@angular/core';
import {VolunteerActivityService} from '../../../../../projects/lib/src/service/volunteer-activity.service';
import {VolunteerActivity} from '../../../../../projects/lib/src/entity/volunteer-activity';
import {ActivatedRoute} from '@angular/router';
import {Assert} from '@yunzhi/utils';

/**
 * 志愿活动管理查看详情
 * #1055
 * @author liguowen
 */
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  /**
   * 志愿活动
   */
  volunteerActivity: VolunteerActivity;

  constructor(private volunteerActivityService: VolunteerActivityService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params.id;
      Assert.isInteger(id, ViewComponent.name + 'id must be int');
      this.volunteerActivityService.getById(id)
        .subscribe(value => {
          this.volunteerActivity = value as VolunteerActivity;
        });
    })
  }
}
