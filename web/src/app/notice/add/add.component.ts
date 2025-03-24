import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NoticeService} from '../../../../projects/lib/src/service/notice.service';
import {CommonService} from '../../../../projects/lib/src/service/common.service';
import {Notice} from '../../../../projects/lib/src/entity/notice';
import {HttpResponse} from '@angular/common/http';
import {YzUploaderService} from '@yunzhi/ng-common';
import {Attachment} from '../../../../projects/lib/src/entity/attachment';

/**
 * 新增通知公告
 */
@Component({
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  /**
   * 初始化表单组
   */
  formGroup = new FormGroup({});
  /**
   * 表单关键字
   */
  formKeys = {
    title: 'title',
    subTitle: 'sunTitle',
    content: 'content',
    summary: 'summary',
    weight: 'weight',
    image: 'image'
  };
  imageUrl: string;
  showUploader = false;

  constructor(private noticeService: NoticeService,
              private commonService: CommonService) {
  }

  ngOnInit(): void {
    this.formGroup.addControl(this.formKeys.title, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.subTitle, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.content, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.summary, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.weight, new FormControl(0, Validators.required));
    this.formGroup.addControl(this.formKeys.image, new FormControl(null, Validators.required));
  }

  onSubmit(formGroup: FormGroup): void {
    const newNotice = {
      title: formGroup.get(this.formKeys.title).value as string,
      subTitle: formGroup.get(this.formKeys.subTitle).value as string,
      content: formGroup.get(this.formKeys.content).value as string,
      summary: formGroup.get(this.formKeys.summary).value as string,
      weight: formGroup.get(this.formKeys.weight).value as number,
      image: formGroup.get(this.formKeys.image).value as Attachment
    } as Notice;

    this.noticeService.save(newNotice)
      .subscribe(() => {
          this.commonService.success(() => this.commonService.back());
        },
        error => console.log('保存失败', error));
  }

  onUploadClose($event: void) {
    this.showUploader = false;
  }

  onUploaded($event: {file: File; response: HttpResponse<Attachment>}) {
    this.showUploader = false;
    YzUploaderService.readerImageFileToDataURL($event.file)
      .subscribe(imageUrl => {
        this.imageUrl = imageUrl;
      });
    this.formGroup.get(this.formKeys.image).setValue($event.response.body);
  }
}
