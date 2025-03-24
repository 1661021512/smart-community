import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {VolunteerActivity} from '../../../../../lib/src/entity/volunteer-activity';
import {environment} from '../../../environments/environment';
import {VolunteerActivityService} from '../../../../../lib/src/service/volunteer-activity.service';
import {IonContent} from '@ionic/angular';
import {isScrollToEnd} from '../../utils';
import {CONTENT_KEYWORD} from '../../../../../lib/src/enum/content-keyword';

/**
 * 志愿者首页
 */

@Component({
  selector: 'wechat-volunteer-index',
  templateUrl: './volunteer-index.component.html',
  styleUrls: ['./volunteer-index.component.scss']
})
export class VolunteerIndexComponent implements OnInit {
  /**
   * 正在加载中
   */
  beLoading = false;
  /**
   * 当前时间
   */
  currentDate: Date;
  @ViewChild('ionContent')
  ionContent: IonContent;
  isLast = false;
  /**
   * 所有的活动
   */
  items = [] as VolunteerActivity[];
  /**
   * 是否正在加载中
   */
  loading = false;
  /**
   * 分页数据
   */
  params = {
    page: 0,
    size: environment.size
  };

  volunteerAssociation = CONTENT_KEYWORD.volunteerAssociation.value;

  constructor(private router: Router,
              private volunteerActivityService: VolunteerActivityService) {
  }

  ngOnInit(): void {
    this.load(this.params);
    this.currentDate = new Date();
    return;
  }

  /**
   * 重新加载分页数据
   * @param params 分页数据
   */
  load(params: {page: number; size: number}) {
    this.loading = true;
    this.volunteerActivityService.wechatPage(params.page, params.size)
      .subscribe(data => {
        this.loading = false;
        this.isLast = data.last;
        // 由于手机端的特殊性，这里用的是内容接拼
        this.items = this.items.concat(data.content);
      });
  }

  onLogScrollEnd() {
    if (!this.isLast) {
      isScrollToEnd(this.ionContent).subscribe(data => {
        if (data) {
          this.params.page++;
          this.load(this.params);
        }
      });
    }
  }

  OnBack() {
    this.router.navigateByUrl('').then();
  }

}
