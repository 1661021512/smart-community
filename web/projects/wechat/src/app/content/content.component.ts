import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Assert} from '@yunzhi/utils';
import {ContentKeyword} from '../../../../lib/src/enum/content-keyword';

/**
 * 根据路由的值来显示指定页面的内容
 */
@Component({
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  keyword: ContentKeyword;

  showTitle = false;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const keyword = params.keyword;
      Assert.isString(keyword, '未接收到keyword');
      this.keyword = keyword;
      const showTitle = params.showTitle;
      if (showTitle && showTitle === 'true') {
        this.showTitle = true;
      }
    });
  }
}
