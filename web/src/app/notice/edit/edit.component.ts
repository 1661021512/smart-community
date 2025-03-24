import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CommonService} from '../../../../projects/lib/src/service/common.service';
import {ActivatedRoute} from '@angular/router';
import {Assert} from '@yunzhi/utils';
import {NoticeService} from '../../../../projects/lib/src/service/notice.service';
import {ImageModel} from '../../../../projects/lib/src/modal/image-model';
import {HttpResponse} from '@angular/common/http';
import {Attachment} from '../../../../projects/lib/src/entity/attachment';
import {YzUploaderService} from '@yunzhi/ng-common';

@Component({
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})

/**
 * 修改页面
 */

export class EditComponent implements OnInit {

  /**
   * 初始化表单组
   */
  formGroup = new FormGroup({});
  /**
   * 表单关键字
   */
  formKeys = {
    id: 'id',
    title: 'title',
    subTitle: 'sunTitle',
    content: 'content',
    name: 'name',
    image: 'image',
    createTime: 'createTime',
    weight: 'weight',
    summary: 'summary'
  }
  imageModel: ImageModel;
  showUploader = false;

  constructor(private noticeService: NoticeService,
              private commonService: CommonService,
              private route: ActivatedRoute) {
  }

  /**
   * 由后台加载预编辑的notice
   * @param id
   */
  loadById(id: number): void {
    this.formGroup.get(this.formKeys.id)?.setValue(id);
    this.noticeService.getById(id)
      .subscribe((notice) => {
        Assert.isNotNullOrUndefined(
          notice,
          notice.title,
          notice.subTitle,
          notice.createUser,
          notice.createTime,
          notice.content,
          'some properties must be passed');
        Assert.isNotNullOrUndefined(notice.createUser.name, 'some properties must be passed');
        this.formGroup.get(this.formKeys.title).setValue(notice.title);
        this.formGroup.get(this.formKeys.subTitle).setValue(notice.subTitle);
        this.formGroup.get(this.formKeys.content).setValue(notice.content);
        this.formGroup.get(this.formKeys.summary).setValue(notice.summary);
        this.formGroup.get(this.formKeys.name).setValue(notice.createUser.name);
        this.formGroup.get(this.formKeys.image).setValue(notice.image);
        this.formGroup.get(this.formKeys.createTime).setValue(notice.createTime);
        this.formGroup.get(this.formKeys.weight).setValue(notice.weight);
        this.imageModel = new ImageModel(notice.image);

      }, error => console.log(error))
  }

  ngOnInit(): void {
    this.formGroup.addControl(this.formKeys.id, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.title, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.subTitle, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.content, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.name, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.summary, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.createTime, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.image, new FormControl(null, Validators.required));
    this.formGroup.addControl(this.formKeys.weight, new FormControl(0, Validators.required));
    // 获取id并找出对应notice

    this.route.params.subscribe(param => {
      const id = +param.id;
      Assert.isNumber(id, 'id must be number');
      this.loadById(+id);
    });
  }

  onSubmit(formGroup: FormGroup): void {
    const id = this.formGroup.get(this.formKeys.id).value;
    const newNotice = {
      id: id as number,
      title: formGroup.get(this.formKeys.title).value as string,
      subTitle: formGroup.get(this.formKeys.subTitle).value as string,
      content: formGroup.get(this.formKeys.content).value as string,
      summary: formGroup.get(this.formKeys.summary).value as string,
      image: formGroup.get(this.formKeys.image).value as Attachment
    };

    this.noticeService.update(id, newNotice)
      .subscribe(() => {
          this.commonService.success(() => this.commonService.back());
        },
        error => console.log('保存失败', error));
  }

  onUploadClose() {
    this.showUploader = false;
  }

  onUploaded($event: {file: File; response: HttpResponse<Attachment>}) {
    this.showUploader = false;
    YzUploaderService.readerImageFileToDataURL($event.file)
      .subscribe(imageUrl => {
        this.imageModel.src = imageUrl
      });
    this.formGroup.get(this.formKeys.image).setValue($event.response.body);
  }
}
