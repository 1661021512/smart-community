import { Component, OnInit } from '@angular/core';
import {ContentKeyword} from '../../../projects/lib/src/enum/content-keyword';
import {ActivatedRoute} from '@angular/router';
import {Assert} from '@yunzhi/utils';

@Component({
  template: `
    <app-content-detail *ngIf="keyword" [title]="title" [keyword]="keyword" ></app-content-detail>`,
})
export class ContentComponent implements OnInit {
  keyword: ContentKeyword;
  title: string;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      Assert.isDefined(data.content, '未获取到路由的data数据');
      Assert.isString(data.content.keyword, data.content.title, '未获取到关键字或title');
      this.keyword = data.content.keyword;
      this.title = data.content.title;
    });
  }

}
