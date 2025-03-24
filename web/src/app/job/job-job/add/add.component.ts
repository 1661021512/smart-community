import {Component, OnInit} from '@angular/core';
import {JobService} from '../../../../../projects/lib/src/service/job.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Job} from '../../../../../projects/lib/src/entity/job';
import {WebUserService} from '../../../../service/web-user.service';
import {User} from '../../../../../projects/lib/src/entity/user';
import {CommonService} from '../../../../../projects/lib/src/service/common.service';
import {Utils} from '@yunzhi/utils';

/**
 * 工作 -》 新增
 */
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  formGroup = new FormGroup({});
  formKeys = {
    endDate: 'endDate',
    origin: 'origin',
    title: 'title',
    summary: 'summary',
    content: 'content'
  }
  user = {} as User;

  constructor(private jobService: JobService,
              private userService: WebUserService,
              private commonService: CommonService) {

  }


  ngOnInit(): void {
    this.userService.currentLoginUser$.subscribe(user => {
      this.user = user;
    });
    this.initFormControl();
    return;
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
    this.jobService.save(job).subscribe(
      () => {
        this.commonService.success(() => this.commonService.back());
      }, error => console.log('保存失败', error));
  }
}
