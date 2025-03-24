import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {VolunteerActivityService} from '../../../../../projects/lib/src/service/volunteer-activity.service';
import {CommonService} from '../../../../../projects/lib/src/service/common.service';
import {HttpResponse} from '@angular/common/http';
import {Attachment} from '../../../../../projects/lib/src/entity/attachment';
import {YzUploaderService} from '@yunzhi/ng-common';
import {Assert, Utils} from '@yunzhi/utils';
import {VolunteerActivity} from '../../../../../projects/lib/src/entity/volunteer-activity';
import {ActivatedRoute} from '@angular/router';

@Component({
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
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
    image: 'image'
  };
  imgSrc = undefined as string;
  showUploader = false;
  /**
   * 志愿活动
   */
  volunteerActivity: VolunteerActivity;

  constructor(
    private volunteerActivityService: VolunteerActivityService,
    private commonService: CommonService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.initFormGroup();
    this.route.params.subscribe(params => {
      const id = +params.id;
      Assert.isInteger(id, EditComponent.name + 'id must be int');
      this.volunteerActivityService.getById(id)
        .subscribe(data => this.setData(data));
    })
  }

  onUpload($event: {file: File; response: HttpResponse<any>}) {
    this.showUploader = false;
    this.formGroup.get(this.formKeys.image).setValue({id: ($event.response.body as Attachment).id});
    YzUploaderService.readerImageFileToDataURL($event.file).subscribe(src => this.imgSrc = src);
  }

  onUploadCancel() {
    this.showUploader = false;
  }

  onSubmit(formGroup: FormGroup): void {
    this.volunteerActivityService.update(this.volunteerActivity.id, {
      name: formGroup.get(this.formKeys.name).value as string,
      endDate: Utils.timestampToIntDate(formGroup.get(this.formKeys.endDate).value as number),
      contact: formGroup.get(this.formKeys.contact).value as string,
      initiator: formGroup.get(this.formKeys.initiator).value as string,
      place: formGroup.get(this.formKeys.place).value as string,
      numberOfPlanned: formGroup.get(this.formKeys.numberOfPlanned).value as number,
      detail: formGroup.get(this.formKeys.detail).value as string,
      image: formGroup.get(this.formKeys.image).value as Attachment,
    }).subscribe(() => {
        this.commonService.success(() => this.commonService.back());
      },
      error => console.log('保存失败', error));
  }

  initFormGroup() {
    this.formGroup.addControl(this.formKeys.name, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.endDate, new FormControl(null, Validators.required));
    this.formGroup.addControl(this.formKeys.contact, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.initiator, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.place, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.numberOfPlanned, new FormControl(null, Validators.required));
    this.formGroup.addControl(this.formKeys.detail, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.image, new FormControl(null, Validators.required));
  }

  setData(data: VolunteerActivity) {
    this.validate(data);
    this.volunteerActivity = data;
    this.updateFormGroup(this.volunteerActivity);
  }

  validate(data: VolunteerActivity) {
    //   todo
  }

  updateFormGroup(volunteerActivity: VolunteerActivity) {
    this.formGroup.get(this.formKeys.name).setValue(volunteerActivity.name);
    this.formGroup.get(this.formKeys.endDate).setValue(Utils.intDateToTimestamp(volunteerActivity.endDate));
    this.formGroup.get(this.formKeys.contact).setValue(volunteerActivity.contact);
    this.formGroup.get(this.formKeys.initiator).setValue(volunteerActivity.initiator);
    this.formGroup.get(this.formKeys.place).setValue(volunteerActivity.place);
    this.formGroup.get(this.formKeys.numberOfPlanned).setValue(volunteerActivity.numberOfPlanned);
    this.formGroup.get(this.formKeys.detail).setValue(volunteerActivity.detail);
    this.formGroup.get(this.formKeys.image).setValue(volunteerActivity.image);
  }
}
