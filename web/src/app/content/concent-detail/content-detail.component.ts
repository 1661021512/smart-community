import {Component, Input, OnInit} from '@angular/core';
import {Assert} from '@yunzhi/utils';
import {ContentService} from '../../../../projects/lib/src/service/content.service';
import {Content} from '../../../../projects/lib/src/entity/content';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {CommonService} from '../../../../projects/lib/src/service/common.service';

/**
 * 内容详情
 */
@Component({
  selector: 'app-content-detail',
  templateUrl: './content-detail.component.html',
  styleUrls: ['./content-detail.component.scss']
})
export class ContentDetailComponent implements OnInit {
  changed = false;
  content = {} as Content;
  contentFormControl = new FormControl('');
  isView = true;
  state = {
    keyword: undefined as string,
    title: undefined as string
  }
  titleFormControl = new FormControl('');

  constructor(private contentService: ContentService,
              private commonService: CommonService) {
  }

  get keyword(): string {
    return this.state.keyword;
  }

  @Input()
  set keyword(keyword: string) {
    this.state.keyword = keyword;
    Assert.isString(this.keyword, '未传入关键字，或传入的关键字不正确');
    this.contentService.existsByKeyword(this.keyword)
      .subscribe(exists => {
        if (exists) {
          this.contentService.getByKeyword(this.keyword)
            .subscribe(content => this.setData(content));
        } else {
          this.setData({title: this.title, content: '', keyword: this.keyword} as Content);
          this.isView = false;
        }
      });
  }

  get title(): string {
    return this.state.title;
  }

  @Input()
  set title(title: string) {
    this.state.title = title;
  }

  ngOnInit(): void {
    this.contentFormControl.valueChanges.subscribe(() => this.changed = true);
  }

  getClass(state: 'view' | 'edit') {
    if (this.isView) {
      return state === 'view' ? 'btn-primary' : 'btn-secondary';
    } else {
      return state === 'view' ? 'btn-secondary' : 'btn-primary';
    }
  }

  setData(content: Content) {
    this.content = content;
    this.titleFormControl.setValue(content.title);
    this.contentFormControl.setValue(content.content);
  }

  onSubmit() {
    const content = {
      title: this.titleFormControl.value as string,
      content: this.contentFormControl.value as string,
      keyword: this.keyword
    };

    let observable: Observable<Content>;
    if (this.content.id) {
      observable = this.contentService.updateById(this.content.id, content);
    } else {
      observable = this.contentService.save(content);
    }

    observable.subscribe(data => {
      this.setData(data);
      this.commonService.success(() => {
        this.changed = false;
        this.isView = true;
      });
    });
  }
}
