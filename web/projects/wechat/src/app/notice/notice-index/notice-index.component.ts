import {Component, Input, OnInit} from '@angular/core';
import {NoticeService} from '../../../../../lib/src/service/notice.service';
import {environment} from '../../../environments/environment';
import {Notice} from '../../../../../lib/src/entity/notice';
import {Assert} from '@yunzhi/utils';
import {Observable} from 'rxjs';

/**
 * 通知公告
 */
@Component({
  selector: 'wechat-notice-index',
  templateUrl: './notice-index.component.html',
  styleUrls: ['./notice-index.component.scss']
})
export class NoticeIndexComponent implements OnInit {
  beLoading = false;
  items = [] as Notice[];
  /**
   * 是否是最后一页
   */
  lastPage = false;
  /**
   * 加载下一页
   */
  @Input()
  loadNextPage$: Observable<void>

  params = {
    page: 0,
    size: environment.size
  };

  constructor(private noticeService: NoticeService) {
  }

  ngOnInit(): void {
    this.load(this.params);
    if (this.loadNextPage$) {
      this.loadNextPage$.subscribe(() => {
        if (!this.beLoading) {
          // 传入了新的页面，加载下一页
          this.load(this.params);
        }
      });
    } else {
      console.warn('未接收到加载下一页的通知源，无法加载下一页');
    }
  }

  load(params: {page: number; size: number}) {
    if (!this.lastPage) {
      this.beLoading = true;
      this.noticeService.page(params.page, params.size)
        .subscribe(data => {
          this.validate(data.content);
          this.beLoading = false;
          // 由于手机端的特殊性，这里用的是内容接拼
          this.items = this.items.concat(data.content);
          if (!data.last) {
            this.params.page++;
          } else {
            this.lastPage = true;
          }
        });
    }
  }

  validate(notices: Notice[]) {
    notices.forEach(notice => {
      Assert.isDefined(notice.image, '图片信息未获取到');
      if (notice.image !== null) {
        Assert.isDefined(notice.image.file, '图片对应的文件信息未获取到');
      }
    })
  }
}
