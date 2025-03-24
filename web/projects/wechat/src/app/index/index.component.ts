import {Component, ViewChild} from '@angular/core';
import {IonContent} from '@ionic/angular';
import {from, Subject} from 'rxjs';

/**
 * 首页
 * https://ionicframework.com/docs/api/progress-bar
 * https://ionicframework.com/docs/api/content
 * https://stackoverflow.com/questions/3898130/check-if-a-user-has-scrolled-to-the-bottom
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight
 */
@Component({
  selector: 'wechat-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {
  @ViewChild('ionContent')
  ionContent: IonContent;
  loadNextPageSubject = new Subject<void>();
  loadNextPage$ = this.loadNextPageSubject.asObservable();
  /**
   * 是否正在加载中
   */
  loading = false;
  /**
   * 当前通知公告的页数
   */
  noticePage = 0;

  constructor() {
  }

  logScrollEnd() {
    from(this.ionContent.getScrollElement())
      .subscribe(scrollElement => {
        if (scrollElement.scrollTop + 1 >=
          scrollElement.scrollHeight - scrollElement.clientHeight) {
          // 加载下一页通知
          this.loadNextPageSubject.next(null);
        }
      });
  }
}
