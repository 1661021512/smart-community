import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../../../projects/lib/src/entity/user';
import {Job} from '../../../../../projects/lib/src/entity/job';
import {JobService} from '../../../../../projects/lib/src/service/job.service';
import {WebUserService} from '../../../../service/web-user.service';
import {CommonService} from '../../../../../projects/lib/src/service/common.service';
import {ActivatedRoute} from '@angular/router';
import {Assert, Utils} from '@yunzhi/utils';

/**
 * 编辑招聘信息
 */
@Component({
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  formGroup = new FormGroup({});
  formKeys = {
    endDate: 'endDate',
    origin: 'origin',
    title: 'title',
    summary: 'summary',
    content: 'content'
  }
  job = {} as Job;
  user = {} as User;

  constructor(private jobService: JobService,
              private userService: WebUserService,
              private commonService: CommonService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.initFormControl();
    this.route.params.subscribe(params => {
      const id = +params.id;
      Assert.isInteger(id, 'id must to int');
      this.jobService.getById(id)
        .subscribe(data => this.setData(data))
    })
  }

  initFormControl() {
    this.formGroup.addControl(this.formKeys.endDate, new FormControl(null, Validators.required));
    this.formGroup.addControl(this.formKeys.title, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.content, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.origin, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.summary, new FormControl('', Validators.required));
  }

  onSubmit(formGroup: FormGroup) {
    const job = {
      endDate: Utils.timestampToIntDate(formGroup.get(this.formKeys.endDate).value as number),
      title: formGroup.get(this.formKeys.title).value as string,
      summary: formGroup.get(this.formKeys.summary).value as string,
      origin: formGroup.get(this.formKeys.origin).value as string,
      content: formGroup.get(this.formKeys.content).value as string,
    } as Job;
    this.jobService.update(this.job.id, job).subscribe(
      () => {
        this.commonService.success(() => this.commonService.back());
      }, error => console.log('保存失败', error));
  }

  setData(job: Job) {
    this.job = job;
    this.setFormData(job);
  }

  setFormData(job: Job) {
    this.formGroup.get(this.formKeys.title).setValue(job.title);
    this.formGroup.get(this.formKeys.summary).setValue(job.summary);
    this.formGroup.get(this.formKeys.content).setValue(job.content)
    this.formGroup.get(this.formKeys.origin).setValue(job.origin)
    this.formGroup.get(this.formKeys.endDate).setValue(Utils.intDateToTimestamp(job.endDate));
  }

}
