import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Assert} from "@yunzhi/utils";
import {Notice} from "../../../../projects/lib/src/entity/notice";
import {NoticeService} from "../../../../projects/lib/src/service/notice.service";
import {ImageModel} from '../../../../projects/lib/src/modal/image-model';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})

export class ViewComponent implements OnInit {

  imageModel: ImageModel;
  notice: Notice;

  constructor(private route: ActivatedRoute,
              private noticeService: NoticeService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params.id;
      Assert.isInteger(id, 'id must to int');
      this.noticeService.getById(id)
        .subscribe(notice => {
          this.validate(notice);
          this.notice = notice;
          this.imageModel = new ImageModel(notice.image);
        });
    })
  }

  /**
   * 数据校验
   * @param notice 通知公告
   */
  validate(notice: Notice) {
    Assert.isNotNullOrUndefined(
      notice.id,
      notice.createUser,
      notice.createTime,
      notice.title,
      notice.summary,
      '校验基本信息错误错误'
    );
    Assert.isNotNullOrUndefined(
      notice.createUser.name,
      '关联信息错误'
    );
  }
}
