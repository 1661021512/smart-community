import {Component, Input, OnInit} from '@angular/core';
import {Assert} from '@yunzhi/utils';
import {Content} from '../../../../../lib/src/entity/content';
import {ContentService} from '../../../../../lib/src/service/content.service';
import {ContentKeyword} from '../../../../../lib/src/enum/content-keyword';

/**
 * 内容详情
 */
@Component({
  selector: 'wechat-content-detail',
  templateUrl: './content-detail.component.html',
  styleUrls: ['./content-detail.component.scss']
})
export class ContentDetailComponent implements OnInit {
  /**
   * 内容
   */
  content: Content;

  /**
   * 对应的内容关键字
   */
  @Input()
  keyword: ContentKeyword;

  /**是否显示标题*/
  @Input()
  showTitle = false;

  constructor(private contentService: ContentService) {
  }

  ngOnInit(): void {
    Assert.isString(this.keyword, ContentDetailComponent.name + '必须传入keyword');
    this.contentService.getByKeyword(this.keyword)
      .subscribe(content => this.setData(content));
  }

  setData(content: Content) {
    this.content = content;
  }
}
