import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Assert} from '@yunzhi/utils';
import {NoticeService} from '../../../../../lib/src/service/notice.service';
import {Notice} from '../../../../../lib/src/entity/notice';

/**
 * 查看通知
 */
@Component({
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  notice: Notice;

  constructor(private route: ActivatedRoute,
              private noticeService: NoticeService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params.id;
      Assert.isInteger(id, 'id类型不正确');
      this.noticeService.getById(id)
        .subscribe(data => this.setData(data));
    })
  }

  public setData(data: Notice) {
    this.validate(data);
    this.notice = data;
  }

  public validate(notice: Notice) {
    Assert.isDefined(notice.createUser, '创建用户校验错误');
  }
}
