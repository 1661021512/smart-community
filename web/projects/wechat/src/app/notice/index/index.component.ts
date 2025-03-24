import {Component, ViewChild} from '@angular/core';
import {Subject} from 'rxjs';
import {IonContent} from '@ionic/angular';
import {isScrollToEnd} from '../../utils';

/**
 * 通知公告列表
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

  constructor() {
  }
  logScrollEnd() {
    isScrollToEnd(this.ionContent).subscribe(data => {
      if (data) {
        this.loadNextPageSubject.next(null);
      }
    });
  }
}
