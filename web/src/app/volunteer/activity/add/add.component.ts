import {HttpResponse} from '@angular/common/http';
import {Attachment} from '../../../../../projects/lib/src/entity/attachment';
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {VolunteerActivity} from '../../../../../projects/lib/src/entity/volunteer-activity';
import {VolunteerActivityService} from '../../../../../projects/lib/src/service/volunteer-activity.service';
import {CommonService} from '../../../../../projects/lib/src/service/common.service';
import {YzUploaderService} from '@yunzhi/ng-common';
import {Utils} from '@yunzhi/utils';

/**
 * 志愿者活动新增
 * #1054
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
    name: 'name',
    endDate: 'endDate',
    contact: 'contact',
    initiator: 'initiator',
    place: 'place',
    numberOfPlanned: 'numberOfPlanned',
    detail: 'detail',
    picture: 'picture'
  };
  imgSrc = undefined as string;
  showUploader = false;

  constructor(
    private volunteerActivityService: VolunteerActivityService,
    private commonService: CommonService
  ) {
  }

  ngOnInit(): void {
    this.formGroup.addControl(this.formKeys.name, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.endDate, new FormControl(null, Validators.required));
    this.formGroup.addControl(this.formKeys.contact, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.initiator, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.place, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.numberOfPlanned, new FormControl(null, Validators.required));
    this.formGroup.addControl(this.formKeys.detail, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.picture, new FormControl(null, Validators.required));
  }

  onUpload($event: {file: File; response: HttpResponse<any>}) {
    this.showUploader = false;
    this.formGroup.get(this.formKeys.picture).setValue({id: ($event.response.body as Attachment).id});
    YzUploaderService.readerImageFileToDataURL($event.file).subscribe(src => this.imgSrc = src);
  }

  onUploadCancel() {
    this.showUploader = false;
  }

  onSubmit(formGroup: FormGroup): void {
    const newVolunteerActivity = {
      name: formGroup.get(this.formKeys.name).value as string,
      endDate: Utils.timestampToIntDate(formGroup.get(this.formKeys.endDate).value as number),
      contact: formGroup.get(this.formKeys.contact).value as string,
      initiator: formGroup.get(this.formKeys.initiator).value as string,
      place: formGroup.get(this.formKeys.place).value as string,
      numberOfPlanned: formGroup.get(this.formKeys.numberOfPlanned).value as number,
      detail: formGroup.get(this.formKeys.detail).value as string,
      image: formGroup.get(this.formKeys.picture).value as Attachment,
    } as VolunteerActivity;

    this.volunteerActivityService.save(newVolunteerActivity).subscribe(() => {
        this.commonService.success(() => this.commonService.back());
      },
      error => console.log('保存失败', error));
  }
}
